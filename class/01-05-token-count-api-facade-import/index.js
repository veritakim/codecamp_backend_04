// const { checkValidationPhone, getToken, sendTokenToSMS } = require("./phone.js")
import { checkValidationPhone, getToken, sendTokenToSMS } from "./phone.js"

function createTokenOfPhone (myPhone) {
  const isValid = checkValidationPhone(myPhone)
  if (!isValid) return

  const myToken = getToken()

  sendTokenToSMS(myPhone, myToken)
}

createTokenOfPhone("0101224224")
