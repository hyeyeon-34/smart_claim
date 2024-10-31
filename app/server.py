from fastapi import FastAPI  # FastAPI 프레임워크를 사용하여 API 서버를 구축합니다.
from fastapi.responses import RedirectResponse  # 특정 경로로 리디렉션 응답을 제공하기 위한 형식입니다.
from fastapi.middleware.cors import CORSMiddleware  # 외부 도메인의 API 접근을 허용하기 위한 CORS 미들웨어입니다.
from typing import List, Union  # Python의 typing 모듈에서 여러 타입을 조합하여 사용하기 위해 가져옵니다.
from pydantic import BaseModel, Field  # Pydantic을 통해 데이터 검증 및 모델 정의를 수행합니다.
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage  # 대화용 메시지 객체를 제공합니다.
from langserve import add_routes  # Langserve에서 API 엔드포인트를 손쉽게 추가할 수 있도록 해주는 함수입니다.
from chain import rag_chain  # 기본 체인 기능을 임포트하여 이후에 API 엔드포인트로 추가할 준비를 합니다.
from chain import sql_chain  # sql 체인 기능을 임포트하여 이후에 API 엔드포인트로 추가할 준비를 합니다.
from chat import chain as chat_chain  # 채팅 관련 체인을 가져와 별칭(chat_chain)을 설정하여 이후 사용합니다.

# FastAPI 인스턴스 생성
# FastAPI 인스턴스는 애플리케이션의 라우팅 및 미들웨어 설정의 시작점이 됩니다.
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

# 루트 경로("/")에 대한 GET 요청 처리 함수
# 사용자가 API의 루트("/")로 접근할 경우 특정 경로로 리디렉션을 수행합니다.
@app.get("/")
async def redirect_root_to_docs():
    # 루트 경로에 접근 시 "/prompt/playground"로 리디렉션합니다.
    # 예를 들어, "/prompt/playground" 경로는 API의 기본 사용 예제를 포함할 수 있습니다.
    return RedirectResponse("/prompt/playground")

# 입력 형식 정의
class AnswerQuestionInput(BaseModel):
    question: str
    user_pn: str
# 기본 chain 엔드포인트를 "/prompt" 경로로 추가
# 기본 기능을 제공하는 체인을 "/prompt" 경로에서 사용할 수 있도록 설정합니다.

add_routes(app, rag_chain,  path="/prompt")  # "prompt" 경로를 통해 기본 체인 기능에 접근 가능하도록 합니다.

add_routes(app, sql_chain.with_types(input_type=AnswerQuestionInput),  path="/sql")  # "prompt" 경로를 통해 기본 체인 기능에 접근 가능하도록 합니다.



# InputChat 클래스 정의: 채팅형 엔드포인트의 입력 형식을 지정하는 데이터 모델
# Pydantic의 BaseModel을 상속하여 입력 데이터의 구조와 유효성을 정의합니다.
class InputChat(BaseModel):
    """채팅 엔드포인트에 사용되는 입력 타입입니다."""

    # messages 필드: 대화에 포함된 메시지 객체 리스트를 정의합니다.
    # HumanMessage, AIMessage, SystemMessage 타입을 사용할 수 있으며, 대화 내용을 포함한 리스트입니다.
    messages: List[Union[HumanMessage, AIMessage, SystemMessage]] = Field(
        ...,  # 필수 필드로 지정합니다.
        description="현재 대화를 나타내는 메시지 리스트입니다.",  # 필드에 대한 설명으로 메시지 리스트임을 나타냅니다.
    )

# chat_chain을 "/chat" 경로에 추가하여 채팅 기능을 활성화합니다.
# 여기서는 채팅 체인에 대한 경로를 추가하고, 피드백과 퍼블릭 링크 기능을 활성화하여 사용자가 채팅 기능을 테스트할 수 있습니다.
add_routes(
    app,
    chat_chain.with_types(input_type=InputChat),  # InputChat 타입을 사용하여 채팅 체인을 구성합니다.
    path="/chat",  # "/chat" 경로에서 채팅 기능을 사용할 수 있도록 설정합니다.
    enable_feedback_endpoint=True,  # 피드백을 제공할 수 있는 엔드포인트를 활성화합니다.
    enable_public_trace_link_endpoint=True,  # 퍼블릭 링크 엔드포인트를 활성화하여 테스트 링크를 제공할 수 있습니다.
    playground_type="chat",  # 이 경로의 타입을 "chat"으로 설정하여 특정 타입별 인터페이스를 제공합니다.
)

# 이 Python 파일이 독립적으로 실행될 경우, uvicorn을 사용하여 FastAPI 앱을 시작합니다.
# uvicorn은 FastAPI의 ASGI 서버를 실행하는 데 사용됩니다.
if __name__ == "__main__":
    import uvicorn  # uvicorn 모듈을 불러옵니다.

    # 앱을 모든 네트워크 인터페이스("0.0.0.0")에서 8000번 포트로 실행합니다.
    # 이렇게 하면 로컬뿐 아니라 네트워크상의 다른 장치에서도 API에 접근할 수 있습니다.
    uvicorn.run(app, host="0.0.0.0", port=8000)
