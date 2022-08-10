const bonus = ["S", "D", "T"];
const options = ["*", "#"];

function solution(dartResult) {
  let answer = [];

  let score = ""; // 점수를 저장하기 위해 사용하는 변수

  for (let i = 0; i < dartResult.length; i++) {
    if (isNaN(dartResult[i]) === false) {
      // 숫자 타입으로 변환한 데이터가 NaN값이 아닌 경우( => 숫자인 경우)
      score += dartResult[i];
    } else {
      // 숫자 타입으로 변환한 데이터가 NaN 값인 경우 (=> 숫자가 아니다)
      if (bonus.includes(dartResult[i])) {
        // 보너스만 뽑기
        score = Number(score);
        if (dartResult[i] === "D") {
          score = Math.pow(score, 2);
        } else if (dartResult[i] === "T") {
          score = Math.pow(score, 3);
        }

        answer.push(score);
        score = "";
      } else if (options.includes(dartResult[i])) {
        // console.log(dartResult[i], answer)
        // 아차상인 경우
        if (dartResult[i] === "#") {
          answer[answer.length - 1] *= -1;
        } else {
          // 스타상인 경우
          answer[answer.length - 1] *= 2;
          if (answer.length > 1) {
            answer[answer.length - 2] *= 2;
          }
        }
      }
    }
  }

  return answer.reduce((acc, cur) => acc + cur, 0);
}
