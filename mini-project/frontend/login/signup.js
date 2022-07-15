// 휴대폰 인증 토큰 전송하기
let phone = ""
const getValidationNumber = async () => {
  document.querySelector('#ValidationInputWrapper').style.display = 'flex'
  const num1 = document.getElementById("PhoneNumber01").value
  const num2 = document.getElementById("PhoneNumber02").value
  const num3 = document.getElementById("PhoneNumber03").value

  phone = num1 + num2 + num3
  axios.post('http://localhost:3000/tokens/phone', {phone}).then((res)=>{
    console.log(res)
  })
  console.log('인증 번호 전송')
}

// 핸드폰 인증 완료 API 요청
const submitToken = async () => {
  const token = document.getElementById("TokenInput").value
  // console.log(phone)
  axios.patch('http://localhost:3000/tokens/phone', {token, phone}).then((res) => {
    console.log(res)
  })
  console.log('핸드폰 인증 완료')
}

// 회원 가입 API 요청
const submitSignup = async () => {
  const name = document.getElementById("SignupName").value
  const p1 = document.getElementById("SignupPersonal1").value
  const p2 = document.getElementById("SignupPersonal2").value
  const personal = p1 + p2
  const prefer = document.getElementById("SignupPrefer").value
  const email = document.getElementById("SignupEmail").value
  const pwd = document.getElementById("SignupPwd").value

  axios.post('http://localhost:3000/user', {name, personal, phone, prefer, email, pwd}).then((res) => {
    console.log(res.data)
  })
  

  console.log('회원 가입 완료')
}
