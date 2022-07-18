import express from 'express'
import mongoose from 'mongoose'
import { Tokens } from '../models/token.model.js'
import { User } from '../models/user.model.js'
import { startCrawling } from './services/cheerio.js'
import { checkEmailValidation, getWelcomeTemplate, sendTemplate } from './services/email.js'

const app = express()
app.use(express.json())

export class UsersController {
  createUsers = async (req, res) => {
    const {name, email, personal, prefer, pwd, phone} = req.body
    const residentNumber = personal.substr(0,7).padEnd(14, "*")
    
    const checkEmail = checkEmailValidation({email})
    if (!checkEmail) return
  
    const site = await startCrawling(prefer)
    
    const result = await Tokens.findOne({phone})
    console.log(result)
    if (result === null || result.isAuth === false) {
      res.status(422).send("에러!!! 핸드폰 번호가 인증되지 않았습니다.")
      return
    } else {
      if (!name && !email && !personal && !prefer && !pwd && !phone) {
        res.send("정보를 확인해주세요")
        return
      } else {
        const user = new User({
          name,
          email,
          personal: residentNumber,
          prefer,
          pwd,
          phone,
          og: site
        })
  
        const dbresult = await user.save()
    
        const emailTemplate = getWelcomeTemplate(name)
        sendTemplate({email, emailTemplate})
        
        res.send(dbresult._id)
      }
    }
  }

  fetchUsers = async(_, res) => {
    const usersResult = await User.find()
  
    res.send(usersResult)
  }
}

mongoose.connect("mongodb://my-database:27017/mydocker04")