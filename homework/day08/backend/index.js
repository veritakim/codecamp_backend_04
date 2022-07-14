import express from 'express'
import cors from 'cors'
import { checkValidationPhone, getToken, sendTokenToSMS } from './phone.js'
import mongoose from 'mongoose'
import { Tokens } from './models/token.model.js'
import e from 'express'

const app = express()
app.use(cors())
app.use(express.json())

app.post('/tokens/phone', async (req, res) => {
  let myphone = req.body.myphone

  const isValid = checkValidationPhone(myphone)
  if(!isValid) return

  const isUser = await Tokens.findOne({phone: myphone})
  const mytoken = getToken()  
  
  console.log("user니?",isUser)
  if (isUser === null) {
    const tokens = new Tokens({
      token: mytoken,
      phone: myphone,
      isAuth: false
    })

    await tokens.save()
  } else {
    let isUserToken = await Tokens.updateOne({phone: myphone}, {token: mytoken})
    await isUserToken.save()
  }
  
    sendTokenToSMS(myphone, mytoken)
  
    res.send(`${mytoken} 인증번호 전송에 성공하였습니다.`)
})

app.patch('/tokens/phone', async (req, res) => {
  const {phone, token} = req.body
  const result = await Tokens.findOne({phone})

  const userToken = result.token
  console.log(userToken)
  if (token !== userToken) {
    res.send("false")
    return
  } else {
    const tokenResult = await Tokens.updateOne({phone}, {isAuth: true})
  
    res.send("ture")
    await tokenResult.save()
  }  
})


mongoose.connect("mongodb://homework-database:27017/hwdocker08")

app.listen(3000, () => {
  console.log('프로그램을 켜는데 성공함')
})