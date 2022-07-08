function bigNum(str) {
  const arr = str.split("")
  // Math.max는 배열을 받지 못한다. 그래서 스프레드 연산자로 해주면 된다.
	return Math.max(...arr)
}

bigNum("12345")
bigNum("87135")