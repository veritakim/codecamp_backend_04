import express from 'express'
import swaggerUi from 'swagger-ui-express'
import { options } from './swagger/config.js'
import swaggerJSDoc from 'swagger-jsdoc'
import cors from 'cors'

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})