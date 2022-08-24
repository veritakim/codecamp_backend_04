function solution(priorities, location) {
  // 내가 뽑고자하는 것을(중요도가 똑같다면 ) 구별을 위한
  const origin = priorities[location];
  priorities[location] = "a";

  // 내가 뽑을 문서의 순서 카운트
  let answer = 0;

  while (true) {
    const search = priorities.indexOf("a");
    // 기존의 값으로 변경해줌
    priorities[search] = origin;

    // 가장 큰 중요도의 문서찾기
    const max = Math.max(...priorities);
    // 다시 문자로 바꿔준다
    priorities[search] = "a";

    // 가장 맨 앞에 있는 문서가 내가 뽑고자 하는 문서가 맞다면
    if (priorities[0] === "a") {
      // 중요도가 가장 큰지 체크
      if (origin === max) {
        return ++answer;
      }
    }

    // 현재 가장 앞에 있는 문서가 가장 큰 중요도를 가지고 있다면 현재 문서 인쇄하기
    if (priorities[0] === max) {
      priorities.shift();
      answer++;
    } else {
      // 현재 가장 앞에 있는 문서가 가장 큰 중요도가 아니라면, 뒤로 보내기
      priorities.push(priorities[0]);
      priorities.shift();
    }
  }
}
