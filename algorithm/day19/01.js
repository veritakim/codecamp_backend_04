const answerTable = [
  // 1번수포자가 찍는 방식 5개 패턴
  [1, 2, 3, 4, 5],
  // 2번 수포자가 찍는 방식 8개 패턴
  [2, 1, 2, 3, 2, 4, 2, 5],
  // 3번 수포자 10개 패턴
  [3, 3, 1, 1, 2, 2, 4, 4, 5, 5],
];

function solution(answers) {
  // 학생들의 점수를 저장하는 배열
  const score = [0, 0, 0];

  for (let i = 0; i < answers.length; i++) {
    for (let j = 0; j < answerTable.length; j++) {
      if (answerTable[j][i % answerTable[j].length] === answers[i]) {
        score[j]++;
      }
    }
  }

  const max = Math.max(...score);

  let answer = [];
  for (let i = 0; i < score.length; i++) {
    if (score[i] === max) {
      answer.push(i + 1);
    }
  }

  return answer;
}

function solution(answers) {
  // 학생들의 점수를 저장하는 배열
  const scoreList = answerTable.map((el, i) => {
    const score = answers.reduce((acc, cur, j) => {
      // console.log(acc, cur, el[j % el.length])

      return acc + (cur === el[j % el.length] ? 1 : 0);
    }, 0);
    return {
      student: i + 1,
      score,
    };
  });

  // console.log(scoreList)

  const biggest = Math.max(
    ...scoreList.map((el) => {
      return el.score;
    })
  );

  return scoreList.filter((el) => el.score === biggest).map((el) => el.student);
}
