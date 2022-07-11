import express from 'express'
import swaggerUi from 'swagger-ui-express'
import { options } from './swagger/config.js'
import swaggerJSDoc from 'swagger-jsdoc'
import cors from 'cors'
import { checkValidationPhone, getToken, sendTokenToSMS } from './phone.js'
import { checkEmailValidation, getWelcomeTemplate, sendTemplateToEmail } from './email.js'

const swaggerSpec = swaggerJSDoc(options)


const app = express()
const port = 3000

app.use(cors())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json())
app.get('/users', (req, res) => {
  const result = [
    { email: "aaa@gmail.com", name: "철수", phone: "010-1234-5678", personal: "220110-2222222", prefer: "https://naver.com"},
    { email: "bb@gmail.com", name: "짱구", phone: "010-1234-5555", personal: "220110-1111111", prefer: "https://daum.com"},
    { email: "bb@gmail.com", name: "맹구", phone: "010-1234-5555", personal: "220110-1111111", prefer: "https://daum.com"},
    { email: "bb@gmail.com", name: "훈이", phone: "010-1234-5555", personal: "220110-1111111", prefer: "https://daum.com"},
    { email: "bb@gmail.com", name: "유리", phone: "010-1234-5555", personal: "220110-1111111", prefer: "https://daum.com"},
  ]
  res.send(result)
})

app.get('/starbucks', (req, res) => {
  const result = [
    {name: "아메리카노", kcal: 5},
    {name: "카페라떼", kcal: 15},
    {name: "콜드브루", kcal: 25},
    {name: "카페모카", kcal: 35},
    {name: "돌체라떼", kcal: 45},
    {name: "카라멜라떼", kcal: 55},
    {name: "에스프레소", kcal: 5},
    {name: "디카페인", kcal: 5},
    {name: "오트라떼", kcal: 5},
    {name: "콘파냐", kcal: 5},
  ]
  res.send(result)
})

// sms
app.post('/tokens/phone', (req, res) => {
  // console.log("얍", req.body)
  let myphone = req.body.myphone
  const isValid = checkValidationPhone(myphone)
  if (!isValid) return

  const myToken = getToken()
  // console.log("token", myToken)
  sendTokenToSMS(myphone, myToken)

  res.send("인증완료")
})

// email
app.post('/user', (req, res) => {
  let {username, useremail, phoneNumber, likeWeb} = req.body
  console.log(useremail)
  checkEmailValidation(useremail)



  const myTemplate = getWelcomeTemplate({username, phoneNumber, likeWeb})
  sendTemplateToEmail({useremail, myTemplate})

  res.send("가입완료!")

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})