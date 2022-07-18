import express from 'express'
import cors from 'cors'
import { getToken, sendTokenToSMS, validationPhone } from "./controllers/services/phone.js"
import { Tokens } from './models/token.model.js'
import mongoose from 'mongoose'
import { Starbucks } from './models/starbucks.model.js'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import { options } from './swagger/config.js'
import { UsersController } from './controllers/users.controllers.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));

const usersController = new UsersController()
app.post('/user',  usersController.createUsers)
app.get('/users', usersController.fetchUsers)

app.post('/tokens/phone', async (req, res) => {
  const { phone } = req.body 

  const isValid = validationPhone(phone)
  if (!isValid) {
    res.send("핸드폰 번호를 확인해주세요")
    return
  } 
  
  const token = getToken()
  const isUser = await Tokens.findOne({phone})
  if (isUser === null) {
    const tokens = new Tokens({
      token,
      phone,
      isAuth: false
    })

    await tokens.save()
  } else {
    
    await Tokens.updateOne({phone}, {token})
  }

  // sendTokenToSMS({token, phone})
  res.send(`${phone}에 ${token}인증번호 전송했습니다.`)
})

app.patch('/tokens/phone', async (req, res) => {
  const {phone, token} = req.body
  const result = await Tokens.findOne({phone})
  if (result === null) {
    res.send("false")
    return
  }
  const userToken = result.token
  if (token !== userToken) {
    res.send("false")
    return
  } else {
    const tokenResult = await Tokens.updateOne({phone}, {isAuth: true})
    
    res.send("ture")
  } 
})

/*
*/
app.get('/starbucks', async (req, res) => {
  const result = await Starbucks.find()
  res.send(result)
})

// mongodb 접속
mongoose.connect("mongodb://my-database:27017/mydocker04")

app.listen(3000, () => {
  console.log(`서버에 연결에 성공했습니다.`)
})