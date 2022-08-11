const permission = "qwertyuiopasdfghjklzxcvbnm1234567890-_.";

function solution(new_id) {
  // 1단계 소문자로 만들기
  new_id = new_id.toLowerCase();
  // 2단계 소문자, -,_,.빼기 나머지 제외한 문자 제거
  let answer = "";
  for (let i = 0; i < new_id.length; i++) {
    if (permission.includes(new_id[i])) {
      answer += new_id[i];
    }
  }

  // 3단계
  while (answer.includes("..")) {
    answer = answer.replace("..", ".");
  }
  // 4단계
  if (answer[0] === ".") {
    answer = answer.substr(1);
  }

  const removeLastDot = () => {
    if (answer[answer.length - 1] === ".") {
      answer = answer.substr(0, answer.length - 1);
    }
    return answer;
  };
  removeLastDot();

  // 5단계 빈문자열
  if (answer === "") {
    answer = "a";
  }

  // 6단계
  if (answer.length >= 16) {
    answer = answer.substr(0, 15);
    removeLastDot();
  }

  console.log(answer);

  // 7단계
  if (answer.length <= 2) {
    answer = answer.padEnd(3, answer[answer.length - 1]);
  }

  return answer;
}
