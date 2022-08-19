function solution(n, words) {
  for (let i = 1; i < words.length; i++) {
    const player = (i % n) + 1;
    const turn = Math.floor(i / n) + 1;

    const preWord = words[i - 1][words[i - 1].length - 1]; // 이전 참가자가 이야기한 단어마지막 글자
    const nowWord = words[i][0]; // 현재 참가자가 이야기한 단어의 첫글자
    if (preWord !== nowWord || words.indexOf(words[i]) !== i) {
      return [player, turn];
    }
  }
  return [0, 0];
}
