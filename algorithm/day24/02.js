function solution(n) {
  let prev = 0;
  let next = 1;
  let sum = 1;

  const answer = new Array(n - 1).fill(1).reduce((acc) => {
    sum = (prev + acc) % 1234567;
    prev = acc;
    return sum;
  }, sum);

  return answer;
}
