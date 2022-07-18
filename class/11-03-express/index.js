import exress from 'express'

const app = exress()

// 중고상품 구매하기
app.post("/products/buy", (req, res) => {
  // 1. 가진 돈을 검증 돈이 있는지(대략 10줄 정도 작성)
  // ...
  // ...
  // ...
  
  // 2. 판매 여부검증 코드 (대략 10줄 정도 작성)
  // ...
  // ...
  // ...

  // 3. 상품 구매하는 코드
  // if ("돈있음" && !"판매완료") {
  //   res.send("상품 구매 완료")
  // }
  
})


// 상품 환불하기
app.post("/products/refund", (req, res) => {
  // 1. 판매 여부검증 코드 (대략 10줄 정도 작성) 위에거 복붙
  // ...
  // ...
  // ...

  // 2. 상품 환불하는  코드
  // if(판매완료) {
  //   res.send("상품 환불 완료")
  // }
})

app.listen(3000, () => {console.log("서버가 연결되었습니다.")})