function solution(s) {
  let answer = s.split(" ")
  
  const a = answer.map((el) => {
      const test = el.split("").map((letter, i) => {
          return i % 2 === 0
                       ? letter.toUpperCase()
                       : letter.toLowerCase()
      })
      return test.join("")
     
  })
   
  return a.join(" ")
   
   
}