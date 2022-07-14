// https://biz.chosun.com/topics/law_firm/2021/09/29/OOBWHWT5ZBF7DESIRKNPYIODLA/
import mongoose from 'mongoose'
import puppeteer from 'puppeteer'
import {Stock} from './models/stock.model.js'
// mongoDB접속
mongoose.connect("mongodb://localhost:27017/mydocker04")

async function startCrawling () {
  const browser = await puppeteer.launch({headless: false})
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 720 })
  await page.goto("https://finance.naver.com/item/sise.naver?code=005930")
  await page.waitForTimeout(1000)
  const framePage = await page.frames().find((el) => el.url().includes("/item/sise_day.naver?code=005930"))

  // const stage = await page.$eval("셀렉터", (el) => (el.textContent))
  for(let i = 3; i <= 7; i++) {
    const date = await framePage.$eval(`body > table.type2 > tbody > tr:nth-child(${i}) > td:nth-child(1) > span`, (el) => el.textContent)
    const price = await framePage.$eval(`body > table.type2 > tbody > tr:nth-child(${i}) > td:nth-child(2) > span`, (el) => el.textContent)
    
    console.log(`${date} 종가 : ${price}`)

    const stock = new Stock({
      name: "삼성전자",
      date: date,
      price: Number(price.replace(",", ""))
    })

    await stock.save()
  }
  await browser.close()
}
startCrawling()