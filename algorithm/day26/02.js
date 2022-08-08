function solution(s) {
  let count = 0; // 변환횟수
  let remove = 0; // 제거된 0의 갯수

  while (s !== "1") {
    count++;
    let temp = "";
    for (let i = 0; i < s.length; i++) {
      if (s[i] === "0") {
        remove++;
        continue;
      }

      temp += s[i];
    }
    s = temp.length;
    s = s.toString(2);
  }

  return [count, remove];
}

function solution(s) {
  let [count, remove] = [0, 0];

  function recursion(s) {
    if (s === "1") {
      return [count, remove];
    }
    count++;
    remove += s.split("").filter((el) => el === "0").length;
    s = s.split("").filter((el) => el !== "0").length;

    return recursion(s.toString(2));
  }

  return recursion(s);
}
