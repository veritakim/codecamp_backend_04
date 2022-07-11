// 휴대폰 인증 토큰 전송하기

const myphone = ""

const getValidationNumber = async () => {
  document.querySelector('#ValidationInputWrapper').style.display = 'flex'
  // console.log(num1+num2+num3)
  const num1 = document.getElementById("PhoneNumber01").value
  const num2 = document.getElementById("PhoneNumber02").value
  const num3 = document.getElementById("PhoneNumber03").value

  myphone = num1+num2+num3

  axios.post("http://localhost:3000/tokens/phone", {
        myphone: myphone
      }).then((res) => {
        console.log(res)
    })
  console.log('인증 번호 전송')
}

// 회원 가입 API 요청
const submitSignup = async () => {
  const num1 = document.getElementById("PhoneNumber01").value
  const num2 = document.getElementById("PhoneNumber02").value
  const num3 = document.getElementById("PhoneNumber03").value

  const username = document.getElementById("SignupName").value
  const useremail = document.getElementById("SignupEmail").value
  const phoneNumber = num1 + num2 + num3
  const likeWeb = document.getElementById("SignupPrefer").value

  axios.post("http://localhost:3000/user", {username, useremail, phoneNumber, likeWeb}).then((res) => {
    console.log(res)
  })
  console.log('회원 가입 이메일 전송')
}
