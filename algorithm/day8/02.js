function solution (x, n) {
  let answer = new Array(n).fill(1).map((el, i) => el * (i + 1) * x)
  
  return answer
}

solution(-4, 3)