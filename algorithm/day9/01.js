function solution(s){
  const count = 1
  let p = 0
  let y = 0
  
  for(let i = 0; i < s.length; i++) {
      if (s[i] === "p") {
          p++
      } else if (s[i] === "y") {
          y++
      }
  }
  
  return p === y ? true : false
}

function solution(s){
  const obj = {p: 0, y: 0}
  
  s.toLowerCase().split("").map((el) => {
      obj[el] = obj[el] + 1
  })
  
  return obj.p === obj.y
 
}

function solution(s){
  const obj = {}
  
  s.toLowerCase().split("").forEach((str) => {
      obj[str] === undefined 
              ? obj[str] = 1
              : obj[str]++
  })
  
  return obj.p === obj.y
 
}