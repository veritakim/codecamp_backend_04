function solution (n) {
  let answer = String(n).split("")
  
  return answer.reduce((acc, cur) => acc + Number(cur), 0)
}

// solution(123)