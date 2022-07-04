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
  const result = String( Math.floor( Math.random() * ( 10 ** num ) ) ).padStart(num, 0)
  console.log(result)
}

getToken(7)