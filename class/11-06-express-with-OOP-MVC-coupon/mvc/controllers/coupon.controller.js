import { CashService } from "./services/cash.js"

export class CouponController {
  buyCoupon = (req, res) => {
    // 1. 갖고 있는 돈이 있나 검증
    const cashService = new CashService
    const hasMoney = cashService.checkValue()

    // 2. 쿠폰 구매하는 코드
    if (hasMoney) {
      res.send("쿠폰구매 완료")
    }
  } 
}