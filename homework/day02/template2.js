import { makeWelcomeTemplate } from './email.js'

function createWelcomeTemplate ({name, email, registerNumber, phoneNumber, webSite}) {

  const sendEmail = makeWelcomeTemplate({name, email, registerNumber, phoneNumber, webSite})
  console.log(sendEmail)
}
const name = "김뿅뿅"
const email = "a@a.com"
const registerNumber = "990802-1233125"
const phoneNumber = "010-1111-2222"
const webSite = "www.naver.com"

createWelcomeTemplate({name, email, registerNumber, phoneNumber, webSite})
