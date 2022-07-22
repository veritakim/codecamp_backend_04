function solution(absolutes, signs) {
  // let answer = 0
  // absolutes.map((el, i) => {
  //     signs[i] ? answer += el : answer -= el
  // })

  return absolutes.reduce(
    (acc, cur, i) => (signs[i] ? acc + cur : acc - cur),
    0
  );

  // return answer
}
