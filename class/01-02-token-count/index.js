console.log("안녕하세요!!")

// 토큰을 발생시키는 함수
/*function getToken () {
  const result = String( Math.floor( Math.random() * 1000000 ) ).padStart(6, 0)
  console.log(result)
}

getToken()
*/

// 매개변수를 넣어서
function getToken (num) {
  // num이 정상인지 아닌지 검증
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
  console.log(result)
}

getToken(4)