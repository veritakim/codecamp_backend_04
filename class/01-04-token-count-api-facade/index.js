function checkValidationPhone(myPhone){
  // 1. 핸드폰 자릿수 맞는지 확인
  if ( myPhone.length !== 10 && myPhone.length !== 11 ) {
    console.log("error!!! 핸드폰 번호를 제대로 입력해 주세요")
    return false
  } else {
    return true
  }
}

function getToken(){
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

function sendTokenToSMS(myPhone, myToken) {
  // 3. 핸드폰 번호에 토큰 전송하기
  console.log(`${myPhone}번호로 인증번호 ${myToken}을 전송합니다.`)
}


function createTokenOfPhone (myPhone) {
  const isValid = checkValidationPhone(myPhone)
  if (!isValid) return

  const myToken = getToken()
  sendTokenToSMS(myPhone, myToken)
}

createTokenOfPhone("0101224224")
