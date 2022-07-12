function solution (seoul) {
  let x = 0

  for (let i = 0; i < seoul.length; i++) {
    if (seoul[i] === "Kim") x = i
  }

  return `김서방은 ${i}에 있다`

}

function solution (seoul) {
  let x = 0

  for (let i = 0; i < seoul.length; i++) {
    if (seoul[i] === "Kim") return `김서방은 ${i}에 있다`
  }
}

function solution (seoul) {
  
  return `김서방은 ${seoul.indexOf("Kim")}에 있다`
}