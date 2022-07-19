function solution(num) {
  let count = 0
  
  for ( let i = 0; i < 500; i++ ) {
      if (num === 1) {
          break
      }
      count++
      if ( num % 2 === 0) {
          num = num / 2
      } else {
          num = (num * 3) + 1
      }
  }
  
  return count === 500 ? -1 : count
}

function solution(num) {
  let count = 0
  
  while(num !== 1 && count !== 500) {
      count++
      if (num % 2 === 0) {
          num = num / 2
      } else {
          num = (num * 3) + 1
      }
  }
  
  return num !== 1 ? -1 : count
}