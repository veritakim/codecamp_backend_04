function solution(s) {
  s = s.split(" ").map((el) => Number(el));
  const min = Math.min(...s);
  const max = Math.max(...s);

  return `${min} ${max}`;
}
