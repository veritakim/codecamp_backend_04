export class CouponController {
  constructor(moneyService) {
    this.moneyService = moneyService
  }

  buyCoupon = (req, res) => {
    // 1. 갖고 있는 돈이 있나 검증
    // const cashService = new CashService
    // const hasMoney = cashService.checkValue()
    const hasMoney = this.moneyService.checkValue()

    // 2. 쿠폰 구매하는 코드
    if (hasMoney) {
      res.send("쿠폰구매 완료")
    }
  } 
}