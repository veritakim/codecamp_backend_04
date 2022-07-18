import exress from 'express'
import { CashService } from './cash.js'
import { ProductService } from './product'

const app = exress()

// 중고상품 구매하기
app.post("/products/buy", (req, res) => {
  // 1. 가진 돈을 검증 돈이 있는지(대략 10줄 정도 작성 => 2줄로)
  const cashService = new CashService()
  const hasMoney = cashService.checkValue()

  // 2. 판매 여부검증 코드 (대략 10줄 정도 작성 => 2줄로)
  const productService = new ProductService()
  const isSoldOut = productService.checkSoldOut()

  // 3. 상품 구매하는 코드
  if (hasMoney && !isSoldOut) {
    res.send("상품 구매 완료")
  }
})

// 상품 환불하기
app.post("/products/refund", (req, res) => {
  // 1. 판매 여부검증 코드 (대략 10줄 정도 작성 => 2줄로)
  const productService = new ProductService()
  const isSoldOut = productService.checkSoldOut()

  // 2. 상품 환불하는  코드
  if(isSoldOut) {
    res.send("상품 환불 완료")
  }
})

app.listen(3000, () => {console.log("서버가 연결되었습니다.")})