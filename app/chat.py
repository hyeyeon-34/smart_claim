from langchain_teddynote.messages import stream_response  # 스트리밍 출력
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_openai import ChatOpenAI

# API KEY를 환경변수로 관리하기 위한 설정 파일
from dotenv import load_dotenv

# API KEY 정보로드
load_dotenv()

llm = ChatOpenAI(
    model="gpt-4o-mini",
    max_tokens=2048,
    temperature=0.1,
)

prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "당신은 챗봇 상담사입니다. 고객의 질문에 성실하게 답변하세요.",
        ),
        MessagesPlaceholder(variable_name="messages"),
    ]
  )

from langchain_core.output_parsers import StrOutputParser
output_parser = StrOutputParser()
chain = prompt | llm | output_parser
