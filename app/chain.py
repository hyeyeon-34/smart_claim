from langchain_teddynote.messages import stream_response  # 스트리밍 출력
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import PromptTemplate
from langchain_openai import ChatOpenAI

# API KEY를 환경변수로 관리하기 위한 설정 파일
from dotenv import load_dotenv
import os

# API KEY 정보로드
load_dotenv()

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
from PyPDF2 import PdfReader


from langchain_experimental.text_splitter import SemanticChunker
from langchain_openai.embeddings import OpenAIEmbeddings
from PyPDF2 import PdfReader

# PDF 파일을 읽어 텍스트를 추출하는 함수
def extract_text_from_pdf(file_path):
    pdf_reader = PdfReader(file_path)
    text = ""
    for page in pdf_reader.pages:
        text += page.extract_text()
    return text


from langchain.retrievers import BM25Retriever, EnsembleRetriever



# URI 생성
db_uri = f"postgresql://{os.getenv('DB_USERNAME')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
db = SQLDatabase.from_uri(db_uri)


# 단계 1: 문서 로드(Load Documents)
# 문서를 로드하고, 청크로 나누고, 인덱싱합니다.
from langchain.document_loaders import PyPDFLoader

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


# 단계 3, 4: 임베딩 & 벡터스토어 생성(Create Vectorstore)
# 벡터스토어를 생성합니다.
vectorstore = FAISS.from_documents(documents=split_docs, embedding=OpenAIEmbeddings())


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




from langchain_community.tools.sql_database.tool import QuerySQLDataBaseTool
from operator import itemgetter

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

# 도구
execute_query = QuerySQLDataBaseTool(db=db)

# SQL 쿼리 생성 체인
write_query = create_sql_query_chain(llm, db, sql_prompt)

answer = answer_prompt | llm | StrOutputParser()

# 생성한 쿼리를 실행하고 결과를 출력하기 위한 체인을 생성합니다.
sql_chain = (
    RunnablePassthrough.assign(query=write_query).assign(
        result=itemgetter("query") | execute_query
    )
    | answer
)


