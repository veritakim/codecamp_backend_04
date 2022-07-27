/*
splice 배열에 사용 가능한 메소드

1. 지정한 배열의 특정 구간 요소를 제거할 수 있다. index로 지정 배열.splice(기준 인덱스, 갯수)
2. 지정한 배열의 특정 구간에 요소를 추가할 수 있다. (인덱스, 0, 넣고싶은 것) (인덱스, 제거하고 싶은 갯수, 넣고싶은 것)

mutable 원본에 영향을 준다
배열에만 사용 가능하면 뮤터블하다

( 반대개념 immutable 원본 데이터를 변환 시킨다. )
문자열, 숫자열은 이뮤터블하다
*/
function solution(participant, completion) {
  for (let i = 0; i < completion.length; i++) {
    if (participant.includes(completion[i])) {
      participant.splice(participant.indexOf(completion[i]), 1);
    }
  }

  return participant.toString();
}

function solution(participant, completion) {
  participant.sort();
  completion.sort();

  for (let i = 0; i < participant.length; i++) {
    if (participant[i] !== completion[i]) {
      console.log(participant[i], completion[i]);
      return participant[i];
    }
  }
}

function solution(participant, completion) {
  participant.sort();
  completion.sort();

  const answer = participant.filter((el, i) => el !== completion[i]);

  return answer[0];
}
