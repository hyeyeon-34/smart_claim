const express = require('express'); // express 모듈 불러오기
const cors = require('cors'); // cors 모듈 불러오기
const PORT = 8080; // 포트 설정

const app = express(); // express 모듈을 사용하기 위해 app 변수에 할당

app.use(cors()); // cors 사용 설정 http, https 프로토콜을 사용하는 서버간의 통신을 허용한다
app.use(express.json()); // json 형식 사용 설정



app.get('/', (req, res) => {
  res.send('Hello World! again again'); // get 요청 시 Hello World! 출력
}); // get 요청 시 실행할 함수




app.use(require('./routes/getroutes'));


app.listen(PORT, () => console.log(`Server is runnig on ${PORT}`)); // 서버 실행 시 메세지 출력