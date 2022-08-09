function solution(n, arr1, arr2) {
  const secretMap = [];
  let secret = "";

  for (let i = 0; i < arr1.length; i++) {
    secretMap[i] = "";
    // 지도 1 암호 2진수
    const map1 = arr1[i].toString(2).padStart(n, "0");
    // 지도2의 암호
    const map2 = arr2[i].toString(2).padStart(n, "0");

    for (let j = 0; j < map1.length; j++) {
      if (map1[j] === "1" || map2[j] === "1") {
        secretMap[i] += "#";
      } else secretMap[i] += " ";
    }
  }
  return secretMap;
}

function solution(n, arr1, arr2) {
  const answer = arr1.map((map1, i) => {
    // 2진수 변환
    map1 = map1.toString(2).padStart(n, "0");

    const map2 = arr2[i].toString(2).padStart(n, "0");

    return map1.split("").reduce((acc, cur, j) => {
      return acc + (cur === "1" || map2[j] === "1" ? "#" : " ");
    }, "");
  });

  return answer;
}
