import express from 'express'
import { checkValidationPhone, sendTokenToSMS, getToken } from './phone.js'
const app = express()

app.use(express.json())

app.get('/boards', (req, res) => {
  // 1. 데이터를 조회하는 로직 - db에서 접속해서 데이터 꺼내오기
  const result = [
    { number: 1, writer: "짱구", title: "초코비 먹을사람", contents: "나 혼자 먹을겁니다 호호~잇" },
    { number: 2, writer: "흰둥이", title: "흰둥이 산책시킬 사람", contents: "산책 시켜주세요" },
    { number: 3, writer: "훈이", title: "훈이는 주먹밥", contents: "훈이 주먹밥" },
  ]
  // 2. 꺼내온 결과 응답주기.
  res.send(result)
})

// 등록 api
app.post('/boards', (req, res) => {
  console.log(req.body)
  // 1. 데이터를 등록하는 로직 => 디비에 접속해서 데이터 저장하기
  
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

app.listen(3000, () => {
  console.log(`프로그램을 켜는데 성공함 얏호!`)
})

