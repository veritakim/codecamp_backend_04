function solution(arr) {
  var answer = 0;
  // arr.map((el) =>  answer +=  el)
  
  // return answer / arr.length
  
  return arr.reduce((acc, cur) => acc + cur) / arr.length
}