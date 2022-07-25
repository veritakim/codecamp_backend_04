const month = {
  1: 31,
  2: 29,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31,
};
function solution(a, b) {
  let answer = 0;

  for (let i = 1; i < a; i++) {
    answer += month[i];
  }
  const week = ["FRI", "SAT", "SUN", "MON", "TUE", "WED", "THU"];
  answer += b - 1;

  return week[answer % 7];
}

function solution(a, b) {
  let whatDate = new Date(2016, a - 1, b);

  const week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // console.log(week[whatDate.getDay() % 7])
  return week[whatDate.getDay() % 7];
}
