import express from 'express'

const app = express()
app.use(express.json())

export class BoardController {
  fetchBoards = (req, res) => {
    // 1. 데이터를 조회하는 로직 - db에서 접속해서 데이터 꺼내오기
    const result = [
      { number: 1, writer: "짱구", title: "초코비 먹을사람", contents: "나 혼자 먹을겁니다 호호~잇" },
      { number: 2, writer: "흰둥이", title: "흰둥이 산책시킬 사람", contents: "산책 시켜주세요" },
      { number: 3, writer: "훈이", title: "훈이는 주먹밥", contents: "훈이 주먹밥" },
    ]
    // 2. 꺼내온 결과 응답주기.
    res.send(result)
  }

  createBoard = (req, res) => {
    // console.log(req.body)
    res.send('게시물 등록에 성공했습니다!')
  }
}