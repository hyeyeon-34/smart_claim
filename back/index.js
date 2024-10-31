const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(require("./routes/claims_histories_rts"));
app.use(require("./routes/documents_rts"));
app.use(require("./routes/login_rts"));
app.use(require("./routes/managers_rts"));
app.use(require("./routes/users_rts"));

app.listen(PORT, () => console.log(`Server is runnig on ${PORT}`));
