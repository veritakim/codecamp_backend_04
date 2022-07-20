function solution(x) {
  let answer = 0;
  x = String(x);

  for (let i = 0; i < x.length; i++) {
    answer += Number(x[i]);
  }

  return x % answer === 0;
}

function solution(x) {
  let s = String(x)
    .split("")
    .reduce((acc, cur) => Number(acc) + Number(cur));
  return x % s === 0;
}
