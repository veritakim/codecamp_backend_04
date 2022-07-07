function countLetter(str) {
  let count = 0

  // let arr = str.split("")

  // for (let i = 0; i < arr.length; i++) {
  //     if (arr[i] === "a" || arr[i] === "A") {
  //         count++
  //     }
  // }

  // 위에서 str을 다 소문자로 바꿔주거나 대문자로 바꿔줘서 조건식 하나만 쓰면 되겠다.

  for (let i = 0; i < str.length; i++) {
    if ( str[i] === 'a' || str[i] === "A" ) {
      count++
    }
  }

  return count
}