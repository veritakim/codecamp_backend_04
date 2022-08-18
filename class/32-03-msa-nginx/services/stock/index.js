import express from "express";

const app = express();

// 주식 가격 조회하기ㅇ
app.get("/stocks", (req, res) => {
  res.send("주식 가격을 조회합니다.");
});
// 주식최대가격 조회하기
app.get("/stocks/max", (req, res) => {
  res.send("주식의 최대 가격을 조회");
});

// 신규주식 등록하기
app.post("stocks", (req, res) => {
  res.send("신규주식을 등록합니다");
});

app.listen(3002);
