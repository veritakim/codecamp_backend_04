import coolsms from 'coolsms-node-sdk'
import 'dotenv/config'

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


export const validationPhone = (phone) => {
  if (phone.length === 11 || phone.length === 10) {
    return true
  } else return false
}


export const sendTokenToSMS = async ({mytoken, phone}) => {
  const SMS_KEY = process.env.SMS_KEY
  const SMS_SECERET = process.env.SMS_SECERET
  const SMS_SENDER = process.env.SMS_SENDER

  const mysms = coolsms.default
  const messageService = new mysms(SMS_KEY, SMS_SECERET);

  const response = await messageService.sendOne({
    to: phone,
    from: SMS_SENDER,
    text: `**[코드캠프]** 안녕하세요? 요청하신 인증번호는 [${mytoken}]입니다.`
  })

  console.log(response)
}