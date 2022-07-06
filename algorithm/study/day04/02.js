function countLetter(str) {
  let count = 0

  let arr = str.split("")

  for (let i = 0; i < arr.length; i++) {
      if (arr[i] === "a" || arr[i] === "A") {
          count++
      }
  }

  return count
}