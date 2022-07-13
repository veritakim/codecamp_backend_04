function solution (array, commands) {
  let answer = []
  
  for (let idx = 0; idx < commands.legnth; idx++) {
    const i = commands[i][0]
    const j = commands[i][1] 
    const k = commands[i][2]
    
    array.map((el, ii) => {
      if (ii >= i || i <= j) {
        answer.apush(el)
      }
    })
  }

  console.log(answer)
}

solution("Zbcdefg")