import { makeWelcomeTemplate } from './email.js'
import * as readline from 'node:readline'

console.log("이름, 이메일, 주민번호, 휴대폰 번호, 내가 좋아하는 사이트 주소를 차례대로 입력해주세요.(입력을 완료했으면 ctrl + c를 눌러주세요)")
 
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
 
let input = []
 
rl.on("line", (line) => {
    input.push(line);
});
 
rl.on('close', () => {
    // console.log(input);
    createWelcomeTemplate(input)
    process.exit();
})

function createWelcomeTemplate (input) {
  const [name, email, registerNumber, phoneNumber, webSite] = input

  const sendEmail = makeWelcomeTemplate({name, email, registerNumber, phoneNumber, webSite})
  console.log(sendEmail)
}

