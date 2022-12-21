const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios").default;
const app = express();
const port = 3456;

const PAYPLE_URL = "https://democpay.payple.kr/php/auth.php";
const account = {
  cst_id: "test",
  custKey: "abcd1234567890",
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/index.html");
});

app.get("/link-referer", (req, res) => {
  res.sendFile(process.cwd() + "/index.html");
});

app.post("/authentication-partner", async (req, res) => {
  const result = await axios.post(PAYPLE_URL, account, {
    headers: {
      "Content-Type": "application/json",
      referer: "http://localhost:3456/link-referer",
    },
  });

  return res.json({ data: result.data }).send();
});

app.post("/my-post", (req, res) => {
  console.log("run my post", req.body);

  return res.send();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
