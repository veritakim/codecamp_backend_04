import exress from 'express'
import { ProductController } from './mvc/controllers/product.controller'

const app = exress()

// 상품 API
const productController = new ProductController()
app.post("/products/buy", productController.buyProduct)// 중고상품 구매하기
app.post("/products/refund", productController.refundProduct)// 상품 환불하기

app.listen(3000, () => {console.log("서버가 연결되었습니다.")})