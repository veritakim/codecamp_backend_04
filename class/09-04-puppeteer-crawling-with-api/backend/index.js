import express from 'express'
import { checkValidationPhone, sendTokenToSMS, getToken } from './phone.js'
import { checkEmailValidation, getWelcomeTemplate, sendTemplate } from './email.js'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import { options } from './swagger/config.js'
import cors from 'cors'
import mongoose from 'mongoose'
import { Board } from './models/board.model.js'
import { Stock } from './models/stock.model.js'


const app = express()
app.use(cors())
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));

app.get('/boards', async (req, res) => {
  const result = await Board.find()
  res.send(result)
})

// 등록 api
app.post('/boards', async (req, res) => {
  const {writer, title, contents} = req.body
  // 1. 데이터를 등록하는 로직 => 디비에 접속해서 데이터 저장하기
  const board = new Board({
    writer,
    title,
    contents
  })

  await board.save() // db전달. 기다려라

  // 2. 저장한 결과 응답 돌려주기.
  res.send('게시물 등록에 성공했습니다!')
})


app.post('/tokens/phone', (req, res) => {
  let myPhone = req.body.myPhone
  const isValid = checkValidationPhone(myPhone)
  if (!isValid) return

  const myToken = getToken()

  sendTokenToSMS(myPhone, myToken)

  res.send("인증완료")
})

// email
app.post('/users', (req, res) => {
  // email 정상인지 확인 ( 1. 정상여부, 2. @가 포함되어있는지)
  const { email, name, age, school } = req.body.myuser

  const checkEmail = checkEmailValidation({email})
  if (!checkEmail) return

  // 2 가입환영 탬플릿 만들기
  const welcomeTemplate = getWelcomeTemplate ({name, age, school})

  // 3 이메일에 가입환영 템플릿 전송하기
  sendTemplate({email, welcomeTemplate})
  res.send("가입완료")
})


// crawling app
app.get("/stocks", async (req, res) => {
  const stocks = await Stock.find()
  res.send(stocks)
})

// mongodb 접속
mongoose.connect("mongodb://my-database:27017/mydocker04")


// 백엔드 api서버 옵흔
app.listen(3000, () => {
  console.log(`프로그램을 켜는데 성공함 얏호!`)
})
