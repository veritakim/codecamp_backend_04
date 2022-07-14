import coolsms from 'coolsms-node-sdk'
import 'dotenv/config'

export function checkValidationPhone(myPhone){
  // 1. 핸드폰 자릿수 맞는지 확인
  if ( myPhone.length !== 10 && myPhone.length !== 11 ) {
    console.log("error!!! 핸드폰 번호를 제대로 입력해 주세요")
    return false
  } else {
    return true
  }
}

export function getToken(){
  // 2. 핸드폰 토큰 6자리 만들기
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
  // console.log(result)

  return result
}


export async function sendTokenToSMS(myPhone, myToken) {
  // 3. 핸드폰 번호에 토큰 전송하기
  // console.log(`${myPhone}번호로 인증번호 ${myToken}을 전송합니다.`)
  const SMS_KEY = process.env.SMS_KEY
  const SMS_SECERET = process.env.SMS_SECERET
  const SMS_SENDER = process.env.SMS_SENDER

  const mysms = coolsms.default
  const messageService = new mysms(SMS_KEY, SMS_SECERET);

  const response = await messageService.sendOne({
    to: myPhone,
    from: SMS_SENDER,
    text: `**[코드캠프]** 안녕하세요? 요청하신 인증번호는 [${myToken}]입니다.`
  })

  console.log(response)
}