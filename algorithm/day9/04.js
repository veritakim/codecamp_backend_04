function solution(arr, divisor) {
  let answer = []
  arr.map((el) => {
      if (el % divisor === 0) answer.push(el)
  })
  
  if (answer.length === 0) {
      answer.push(-1)
  } 
  
  return answer.sort((a,b) => a - b)
}

function solution(arr, divisor) {
  let answer = arr.filter((el) => (el % divisor === 0))
  
  if (answer.length === 0) {
      answer.push(-1)
  } 
  
  return answer.sort((a,b) => a - b)
}