const express = require('express');
const PORT = 8080;

const app = express();

const cors = require('cors');

app.use(
  cors({
    origin: 'http://localhost:3000', // 프론트엔드 주소
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
  })
);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(require('./routes/claims_histories_rts'));
app.use(require('./routes/documents_rts'));
app.use(require('./routes/login_rts'));
app.use(require('./routes/managers_rts'));
app.use(require('./routes/users_rts'));

app.listen(PORT, () => console.log(`Server is runnig on ${PORT}`));
