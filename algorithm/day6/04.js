function solution(phone_number) {
  let answer = '';
  
  for (let i = 0; i < phone_number.length; i++){
      if ( i < phone_number.length - 4) {
          answer += "*"
      } else answer += phone_number[i]
  }
  
  return answer
}

function solution2(phone_number) {
  let answer = '';
  
  answer = answer.padStart(phone_number.length - 4, "*")
  
  answer += phone_number.slice(-4)
  
  return answer
}