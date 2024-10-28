const express = require("express");
const PORT = 8080;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(require("./routes/get_routes"));
app.use(require("./routes/post_routes"));
app.use(require("./routes/patch_routes"));
app.use(require("./routes/delete_routes"));

app.listen(PORT, () => console.log(`Server is runnig on ${PORT}`));
