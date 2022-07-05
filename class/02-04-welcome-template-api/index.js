import { checkEmailValidation, getWelcomeTemplate, sendTemplate } from "./email.js"

function createUser({name, age, school, email}){
  // email 정상인지 확인 ( 1. 정상여부, 2. @가 포함되어있는지)
  const checkEmail = checkEmailValidation({email})
  if (!checkEmail) return

  // 2 가입환영 탬플릿 만들기
  const welcomeTemplate = getWelcomeTemplate ({name, age, school})
  
  // 3 이메일에 가입환영 템플릿 전송하기
  sendTemplate({email, welcomeTemplate})
}

const name = "철수"
const age = 8
const school = "다람쥐초등학교"
const email = "av@a.com"
createUser({name, age, school, email})