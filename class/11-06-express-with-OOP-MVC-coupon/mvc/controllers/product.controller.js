import { CashService } from './services/cash.js'
import { ProductService } from './services/product.js'

export class ProductController {
  // 상품 구매하기
  buyProduct =  (req, res) => {
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
  }

  refundProduct = (req, res) => {
    // 1. 판매 여부검증 코드 (대략 10줄 정도 작성 => 2줄로)
    const productService = new ProductService()
    const isSoldOut = productService.checkSoldOut()
  
    // 2. 상품 환불하는  코드
    if(isSoldOut) {
      res.send("상품 환불 완료")
    }
  }
}