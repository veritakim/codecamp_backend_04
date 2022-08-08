function solution(n) {
  let num = n;
  return parseInt(num.toString(3).split("").reverse().join(""), 3);
}
