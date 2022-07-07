import express from 'express'
const app = express()

app.get('/aaa', (req, res) => {
  res.send('요호호호')
})

// 등록 api
// app.post('/qqq', (req, res) => {})

app.listen(3000, () => {
  console.log(`프로그램을 켜는데 성공함 얏호!`)
})