function solution(d, budget) {
  d.sort((a, b) => a - b);
  let sum = 0;
  let answer = 0;
  for (let i = 0; i < d.length; i++) {
    sum += d[i];
    if (sum <= budget) {
      answer++;
    }
  }

  return answer;
}

function solution(d, budget) {
  d.sort((a, b) => a - b);
  let sum = 0;
  let answer = 0;

  while (budget - d[answer] >= 0) {
    budget -= d[answer];
    answer++;
  }

  return answer;
}

function solution(d, budget) {
  return d
    .sort((a, b) => a - b)
    .filter((money) => {
      budget -= money;

      return budget >= 0;
    }).length;
}
