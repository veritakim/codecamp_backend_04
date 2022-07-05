export function makeWelcomeTemplate({name, email, registerNumber, phoneNumber, webSite}) {
  const template = `
    <html>
      <body>
        <h1>${name}님 가입을 환영합니다.</h1>
        <hr>
        <div>이메일: ${email}</div>
        <div>주민번호: ${registerNumber}</div>
        <div>휴대폰 번호: ${phoneNumber}</div>
        <div>내가 좋아하는 사이트: ${webSite}</div>
      </body>
    </html>
  `

  return template
}