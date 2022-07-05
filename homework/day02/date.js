function getToday() {
  const date = new Date()

  const yyyy = date.getFullYear()
  const mm = String( date.getMonth() + 1 ).padStart(2, "0")

  const dd = String( date.getDate() ).padStart(2, "0")
  const time = String(date).split(" ")[4]

  console.log(`오늘은 ${yyyy}년 ${mm}월 ${dd}일 ${time}입니다.`) 
}

getToday()