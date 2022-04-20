const express = require("express");
const app = express();
const port = 1337;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Tieso Shark!");
});

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
