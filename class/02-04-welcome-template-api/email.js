import { getToday } from "./utils.js"

export function checkEmailValidation ({email}) {
  if (!email || !email.includes("@")) {
    console.log("email형식이 맞는지 확인하세요!!!")
    return false
  } else {
    return true
  }
}

export function getWelcomeTemplate ({name, age, school, createdAt}) {

  const myTemplate = `
    <html>
      <body>
        <h1> ${name}님 가입을 환영합니다 !!! </h1>
        <hr />
        
        <div>이름: ${name}</div>
        <div>나이: ${age}</div>
        <div>학교: ${school}</div>
        <div>가입일: ${getToday()}</div>
      </body>
    </html> 
  `
  
  return myTemplate
}

export function sendTemplate ({email, welcomeTemplate}) {
  console.log(`${email}로 ${welcomeTemplate}를 전송합니다.`)
}