function solution (n) {
  let answer = 0

  for (let i = 1; i <= n; i++){
    if (n % i === 0) {
      answer += i
    }
  }

  return answer
}


function solution (n) {
  let answer = n
  
  for (let i = 1; i <= n / 2; i++){
    if (n % i === 0) {
      answer += i
    }
  }
  
  return answer
}

function solution (s) {
  let answer = n
  const arr = new Array(n).fill(n)

  return arr.reduce((cur, ele, idx) => {
    const num = ele + idx
    
    return n % num !== 0 ? cur : cur + num
  }, 0)
}