const { Pool } = require('pg'); // postgre 모듈 불러오기
require('dotenv').config(); // .env 파일 사용 설정

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  db_name: process.env.DB_NAME,
});

module.exports = pool; // {}로 감쌀 경우 pool .pool 변수로 사용해야함