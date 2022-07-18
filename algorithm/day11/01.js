function solution(n) {
  let answer = -1
  for (let i = 1; i * i <= n; i++) {
      if (i * i === n) {
          console.log(i)
          // answer = i + 1
          return (i + 1) * ( i + 1)
      }
  }
  return answer
  
}


function solution(n) {
  let sqrt = Math.sqrt(n)
  // console.log(Number.isInteger(sqrt))
  if (Number.isInteger(sqrt)) {
      return (sqrt + 1) ** 2
  } return -1
  
}