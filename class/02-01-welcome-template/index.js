const apple = 3
const banana = 2

// console.log(`철수는 사과를 ${apple}개, 바나나를 ${banana}개 갖고 있습니다.`)


function getWelcomeTemplate (userName, userAge, userSchool, createdAt) {
  const myTemplate = `
    <html>
      <body>
        <h1> ${userName}님 가입을 환영합니다 !!! </h1>
        <hr />
        
        <div>이름: ${userName}</div>
        <div>나이: ${userAge}</div>
        <div>학교: ${userSchool}</div>
        <div>가입일: ${createdAt}</div>
      </body>
    </html> 
  `
  
  console.log(myTemplate)
}

const userName = "짱구"
const userAge = 9
const userSchool = "떡잎초등학교"
const createdAt = "2022-02-05"

// getWelcomeTemplate("짱구", 9, "떡잎초등학교", "2020-02-05")
getWelcomeTemplate(userName, userAge, userSchool, createdAt)