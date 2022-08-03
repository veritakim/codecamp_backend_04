function solution(N, stages) {
  stages.sort((a, b) => a - b);
  // stage에 해당하는 유저 수, 실패율을 저장하는 배열
  const failArr = [];
  for (let i = 1; i <= N; i++) {
    failArr.push({
      stage: i,
      users: 0,
      fail: 0,
    });
  }

  // 총 유저의 수를 저장
  let allUsers = stages.length;

  for (let i = 0; i < stages.length; i++) {
    if (failArr[stages[i] - 1] !== undefined) {
      failArr[stages[i] - 1].users++;

      // 현재 스테이지 번호와 다음 스테이지 번호가 다를 때
      // 현재 스테이지 정보 참조가 끝났을 때
      if (stages[i] !== stages[i + 1]) {
        // 실패율 구하기
        const fail = failArr[stages[i] - 1].users / allUsers;
        allUsers -= failArr[stages[i] - 1].users;
        failArr[stages[i] - 1].fail = fail;
      }
    }
  }
  const answer = failArr.sort((a, b) => b.fail - a.fail);
  return answer.map((el) => el.stage);
}

function solution(N, stages) {
  stages.sort((a, b) => a - b);
  let allUsers = stages.length;
  const answer = new Array(N)
    .fill(1)
    .map((num, i) => {
      const stage = num + i;
      const arr = stages.slice(
        stages.indexOf(stage),
        stages.lastIndexOf(stage) + 1
      );

      const fail = arr.length / allUsers;
      allUsers -= arr.length;

      return { stage, fail };
    })
    .sort((a, b) => b.fail - a.fail)
    .map((el) => el.stage);

  return answer;
}
