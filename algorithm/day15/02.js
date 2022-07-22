function solution(s) {
  let str = s.split(" ");

  // for (let i = 0; i < str.length; i++) {
  //     let answer = ""
  //     for (let j = 0; j < str[i].length; j++) {
  //      if (j === 0) {
  //          answer += str[i][j].toUpperCase()
  //      } else answer += str[i][j].toLowerCase()
  //     }
  //     str[i] = answer
  // }

  return str
    .map((el) => {
      const answer = el.split("").map((letter, i) => {
        return i === 0
          ? (letter = letter.toUpperCase())
          : (letter = letter.toLowerCase());
      });
      return answer.join("");
    })
    .join(" ");
}
