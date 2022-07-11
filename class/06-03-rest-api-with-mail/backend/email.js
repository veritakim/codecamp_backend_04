import { getToday } from "./utils.js"
import nodemailer from 'nodemailer'
import 'dotenv/config'

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
        <div style="display: flex; flex-direction: column; align-items: center;">
          <div style="width: 500px; border: 1px solid black;">
            <h1 style="color: blue;"> ${name}님 가입을 환영합니다 !!! </h1>
            <hr />
            
            <div>이름: ${name}</div>
            <div>나이: ${age}</div>
            <div>학교: ${school}</div>
            <div>가입일: ${getToday()}</div>
          </div>
        </div>
      </body>
    </html> 
  `
  
  return myTemplate
}

export async function sendTemplate ({email, welcomeTemplate}) {
  const EMAIL_USER = process.env.EMAIL_USER
  const EMAIL_PASS = process.env.EMAIL_PASS
  const EMAIL_SENDER = process.env.EMAIL_SENDER
  
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    }
  })

  const response = await transporter.sendMail({
    from: EMAIL_SENDER,
    to: email,
    subject: "*!*가입을 축하합니다*!*",
    html: welcomeTemplate,
  })
  // console.log(`${email}로 ${welcomeTemplate}를 전송합니다.`)
  console.log(response)
}