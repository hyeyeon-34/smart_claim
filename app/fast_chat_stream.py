from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware  # 외부 도메인의 API 접근을 허용하기 위한 CORS 미들웨어입니다.
from typing import Optional
from fastapi.responses import StreamingResponse
from typing import Optional, AsyncGenerator

app = FastAPI()

# CORS (Cross-Origin Resource Sharing) 허용을 위한 미들웨어 설정
# 외부 도메인에서 API에 접근할 수 있도록 모든 출처의 요청을 허용하는 설정을 추가합니다.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 모든 출처의 클라이언트가 API에 접근 가능하도록 허용합니다.
    allow_credentials=True,  # 클라이언트에서 인증 정보를 포함한 요청을 허용합니다.
    allow_methods=["*"],  # 모든 HTTP 메서드(GET, POST, PUT, DELETE 등)를 허용합니다.
    allow_headers=["*"],  # 모든 HTTP 헤더를 허용합니다.
    expose_headers=["*"],  # 클라이언트가 볼 수 있는 HTTP 헤더를 명시하여 노출합니다.
)


# 랭체인 추적
from langchain_teddynote import logging

# API 키를 환경변수로 관리하기 위한 설정 파일
from dotenv import load_dotenv
import os

# 패키지 로드
import bs4
from langchain import hub
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import WebBaseLoader
from langchain_community.vectorstores import Chroma, FAISS
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain.chains import create_sql_query_chain
from langchain_community.utilities import SQLDatabase

from langchain_experimental.text_splitter import SemanticChunker
from langchain.document_loaders import PyPDFLoader

from PyPDF2 import PdfReader

from langchain_experimental.text_splitter import SemanticChunker
from langchain_openai.embeddings import OpenAIEmbeddings

from langchain.retrievers import BM25Retriever, EnsembleRetriever

## 랭체인 추적

# API 키 정보 로드
load_dotenv()
# 프로젝트 이름을 입력합니다.
logging.langsmith("RAG_TUTORIAL_02")


# PDF 파일을 읽어 텍스트를 추출하는 함수
def extract_text_from_pdf(file_path):
  pdf_reader = PdfReader(file_path)
  text = ""
  for page in pdf_reader.pages:
    text += page.extract_text()
  return text



## DB 연결

# PostgreSQL 데이터베이스에 연결합니다.
# URI 형식: postgresql://username:password@host:port/database

# URI 생성
db_uri = f"postgresql://{os.getenv('DB_USER')}:{os.getenv('DB_PASS')}@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
db = SQLDatabase.from_uri(db_uri)

# 데이터베이스의 정보를 출력합니다.
# print(db.dialect)

# 사용 가능한 테이블 이름들을 출력합니다.
# print(db.get_usable_table_names())

# 단계 1: 문서 로드(Load Documents)
# 문서를 로드하고, 청크로 나누고, 인덱싱합니다.

# PDF 파일 로드. 파일의 경로 입력
file_path = "data/202009_5.이동통신단말기분실보험_약관_7.pdf"
loader = PyPDFLoader(file_path=file_path)


# 단계 2: 문서 분할(Split Documents)
# 페이지 별 문서 로드
docs = loader.load()

# SemanticChunker 설정
semantic_text_splitter = SemanticChunker(
  OpenAIEmbeddings(), add_start_index=True
)

# SemanticChunker를 사용하여 텍스트 스플릿
split_docs = semantic_text_splitter.split_documents(docs)



# 벡터 스토어 경로
vectorstore_path = "vdb/faiss_vectorstore.pkl"


# 벡터 스토어 로드 또는 생성
if os.path.exists(vectorstore_path):
  # 기존 벡터 스토어 로드
  # vectorstore = FAISS.load_local(vectorstore_path, embedding=OpenAIEmbeddings())
  embeddings = OpenAIEmbeddings()
  vectorstore = FAISS.load_local(vectorstore_path, embeddings, allow_dangerous_deserialization=True)

else:
  ## Vector DB 구축

  # 단계 3, 4: 임베딩 & 벡터스토어 생성(Create Vectorstore)
  # 벡터스토어를 생성합니다.
  vectorstore = FAISS.from_documents(documents=split_docs, embedding=OpenAIEmbeddings())

  
  # 벡터 스토어 저장
  vectorstore.save_local(vectorstore_path)



# 단계 5: 리트리버 생성(Create Retriever)
# 사용자의 질문(query) 에 부합하는 문서를 검색합니다.

# 유사도 높은 K 개의 문서를 검색합니다.
k = 3

# (Sparse) bm25 retriever and (Dense) faiss retriever 를 초기화 합니다.
bm25_retriever = BM25Retriever.from_documents(split_docs)
bm25_retriever.k = k

faiss_vectorstore = FAISS.from_documents(split_docs, OpenAIEmbeddings())
faiss_retriever = faiss_vectorstore.as_retriever(search_kwargs={"k": k})

# initialize the ensemble retriever
ensemble_retriever = EnsembleRetriever(
  retrievers=[bm25_retriever, faiss_retriever], weights=[0.5, 0.5]
)


# 단계 6: 프롬프트 생성
from langchain_core.prompts import PromptTemplate

# 개인정보 필터링용 프롬프트 설정
personally_filter_prompt = PromptTemplate.from_template(
  """
  Given a user question, determine if the question requests personally identifiable information (PII),
  such as names, addresses, phone numbers, email addresses, or other sensitive information.
  
  If the question is asking for information about "all users" or "specific other users", respond with "RESTRICTED".
  If the question is asking about the user's own information (e.g., "my information", "details about me"),
  respond with "ALLOW".

  Question: {question}
  """
)

# 질문 필터링용 프롬프트 설정
filter_prompt = PromptTemplate.from_template(
  """
  Given a user question, determine if it requires a database SQL query or if it can be answered 
  using only the provided document context (vector store). If it needs database access, respond 
  with 'DB_REQUIRED'. Otherwise, respond with 'VECTOR_ONLY'.
  
  Question: {question}
  """
)

# SQL 쿼리 체인을 위한 프롬프트 설정
sql_prompt = PromptTemplate.from_template(
  """
  Given a user question, create a syntactically correct {dialect} SQL query using only the provided `user_pn` 
  to ensure they can only access their own information. Do not allow queries that would retrieve data about 
  other users. Include only the executable SQL query in the output, without additional formatting or labels.

  SQL Query Format:
  SELECT *
  FROM "User" AS u
  JOIN "Phone_Model" AS p ON u.model_idx = p.model_idx
  WHERE u.user_pn = {user_pn} LIMIT {top_k};

  Only use the following tables:
  {table_info}

  Question: {input}
  """
).partial(dialect="postgresql")

answer_prompt = PromptTemplate.from_template(
  """Given the following user question, corresponding SQL query, and SQL result, answer the user question.

  Question: {question}
  SQL Query: {query}
  SQL Result: {result}
  Answer: """
)



# 단계 7: 언어모델 생성(Create LLM)
# 모델(LLM) 을 생성합니다.
llm = ChatOpenAI(model_name="gpt-4o-mini", temperature=0)


from langchain_community.tools.sql_database.tool import QuerySQLDataBaseTool
from operator import itemgetter

# DB 검색을 위한 체인 생성 함수
def create_db_chain(question, user_pn):
  # 도구
  execute_query = QuerySQLDataBaseTool(db=db)

  # SQL 쿼리 생성 체인
  write_query = create_sql_query_chain(llm, db, sql_prompt)

  answer = answer_prompt | llm | StrOutputParser()

  # 생성한 쿼리를 실행하고 결과를 출력하기 위한 체인을 생성합니다.
  db_chain = (
    RunnablePassthrough.assign(query=write_query).assign(
      result=itemgetter("query") | execute_query
    )
    | answer
  )

  return db_chain.invoke({"question": question, "user_pn": user_pn})

# 벡터 스토어 검색을 위한 체인 생성 함수
def create_vector_chain(question):
  # 프롬프트를 생성합니다.
  prompt = hub.pull("rlm/rag-prompt")

  # 모델(LLM) 을 생성합니다.
  llm = ChatOpenAI(model_name="gpt-4o-mini", temperature=0)

  def format_docs(docs):
    # 검색한 문서 결과를 하나의 문단으로 합쳐줍니다.
    return "\n\n".join(doc.page_content for doc in docs)

  # 단계 8: 체인 생성(Create Chain)
  rag_chain = (
    {"context": ensemble_retriever | format_docs, "question": RunnablePassthrough()}
    | prompt
    | llm
    | StrOutputParser()
  )
  
  return rag_chain.invoke(question)  # 딕셔너리로 전달


# 메인 함수: 질문을 필터링하고 적합한 체인을 실행
def answer_question(question, user_pn):
  # 질문 필터링
  # 질문이 개인정보와 관련된 경우 필터링
  # personally_filter_response = llm(personally_filter_prompt.format({"question": question}))

  personally_chain_filter_response = (
    {"question": RunnablePassthrough()}
    | personally_filter_prompt
    | llm
    | StrOutputParser()
  )

  personally_filter_response = personally_chain_filter_response.invoke({"question": question})

  if personally_filter_response == "RESTRICTED":
    # print("This question contains restricted content and cannot be answered.")
    return "개인정보 보호를위해 답변이 불가능한 질문입니다."
  elif user_pn == "":
    return "개인정보 확인을 위해 로그인이 필요한 질문입니다."
  else:
    # 답변을 허용하고 다음 단계로 진행
    pass
  
  chain_filter_response = (
    {"question": RunnablePassthrough()}
    | filter_prompt
    | llm
    | StrOutputParser()
  )

  filter_response = chain_filter_response.invoke({"question": question})
  # print('filter_response', filter_response)
  
  if "DB_REQUIRED" in filter_response:  # 필터 결과 확인 방식 수정
    # DB 검색 체인 실행
    print("DB 검색 체인 실행을 통한 답변")
    response = create_db_chain(question, user_pn)
  else:
    # 벡터 스토어 검색 체인 실행
    print("벡터 스토어 검색 체인 실행을 통한 답변")
    response = create_vector_chain(question)
  
  return response

# 기본 모델 정의
class QuestionRequest(BaseModel):
    question: str
    user_pn: Optional[str] = None

import asyncio
from typing import AsyncGenerator, Optional

async def answer_question_stream(question: str, user_pn: Optional[str] = None) -> AsyncGenerator[str, None]:
    try:
        # 프롬프트를 사용하여 질문을 필터링
        personally_filter_text = personally_filter_prompt.format(question=question)
        personally_filter_response = llm(personally_filter_text)
        
        if personally_filter_response == "RESTRICTED":
            yield "개인정보 보호를 위해 답변이 불가능한 질문입니다."
            return
        elif not user_pn:
            yield "개인정보 확인을 위해 로그인이 필요한 질문입니다."
            return

        # 필터링으로 DB 또는 VECTOR 체인 선택
        filter_text = filter_prompt.format(question=question)
        filter_response = llm(filter_text)

        if "DB_REQUIRED" in filter_response:
            response = create_db_chain(question, user_pn)  # 동기식일 경우 수정 필요
        else:
            response = create_vector_chain(question)  # 동기식일 경우 수정 필요

        # 생성된 응답을 스트리밍으로 전송
        for part in response.split("\n"):  # 한 줄씩 스트리밍 응답
            yield part
            await asyncio.sleep(0.1)  # 예시용 지연 시간

    except Exception as e:
        yield f"에러가 발생했습니다: {str(e)}"



# 질문 API 엔드포인트 (스트리밍 방식)
@app.post("/answer_question_stream")
async def api_answer_question_stream(request: QuestionRequest):
    return StreamingResponse(answer_question_stream(request.question, request.user_pn), media_type="text/plain")

# FastAPI 실행 설정
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
