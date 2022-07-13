function solution (s) {
  let answer = []

  for (let i = 0; i < s.length; i++) {
    arr.push(s[i])
  }

  arr.sort((a, b) => {return a > b ? -1 : 1})

  return arr.join("")
}

solution("Zbcdefg")