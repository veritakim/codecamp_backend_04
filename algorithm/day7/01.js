function solution(s) {
  const center = Math.floor(s.length / 2)

  return s.length % 2 ? s[center] : s.slice(center - 1, center + 1)
}