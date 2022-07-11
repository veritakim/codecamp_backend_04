function solution(phone_number) {

  let answer = '';
  
  
  answer = answer.padStart(phone_number.length  - 4, "*")
  
  answer += phone_number.slice(-4)
  
  return answer
}