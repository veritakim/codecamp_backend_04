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

export function getWelcomeTemplate ({username, phoneNumber, likeWeb}) {

  const myTemplate = `
    <html>
      <body>
        <div style="display: flex; flex-direction: column; align-items: center;">
          <div style="width: 500px;">
            <h1> ${username}님 가입을 환영합니다 !!! </h1>
            <hr />
            
            <div>이름: ${username}</div>
            <div style="color: purple;">전화번호: ${phoneNumber}</div>
            <div style="color: purple;">좋아하는 사이트: ${likeWeb}</div>
            <div>가입일: ${getToday()}</div>
          </div>
        </div>
      </body>
    </html> 
  `
  
  return myTemplate
}

export async function sendTemplateToEmail({useremail, myTemplate}) {
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

  const result = await transporter.sendMail({
    from: EMAIL_SENDER,
    to: useremail,
    subject: "가입을 환영합니다^^",
    html: myTemplate
  })

  console.log(result)
}