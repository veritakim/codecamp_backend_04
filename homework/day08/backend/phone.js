import coolsms from 'coolsms-node-sdk'
import 'dotenv/config'

export const checkValidationPhone = (myphone) => {
  if ( myphone.length !== 13 && myphone.length !== 12 ) {
    console.log("error!!! 핸드폰 번호를 제대로 입력해 주세요")

    return false
  } else return true
}

export const getToken = () => {
  const num = 6
  if ( !num ) {
    console.log("error!!! num이 있는지 확인해주세요")
    return
  } else if ( num <= 0) {
    console.log("error!!! num의 수가 너무 작습니다")
    return
  } else if ( num > 10) {
    console.log("error!!! num의 수가 너무 큽니다.")
  }

  const result = String( Math.floor( Math.random() * ( 10 ** num ) ) ).padStart(num, 0)

  return result
}

export async function sendTokenToSMS(myphone, myToken) {
  const mysms = coolsms.default;

  const SMS_KEY = process.env.SMS_KEY
  const SMS_SECERET = process.env.SMS_SECERET
  const SMS_SENDER = process.env.SMS_SENDER

  const messageService = new mysms(SMS_KEY, SMS_SECERET);
  
  const phone = myphone.split("-").join("")
  const result = await messageService.sendOne({
    to: phone,
    from: SMS_SENDER,
    text: `인증번호: [${myToken}]입니다.`
  })

  console.log(result)
}