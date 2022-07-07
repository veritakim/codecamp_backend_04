function bigNum(str) {
	let biggest = 0;
  
  for (let i = 0; i < str.length; i++) {
    biggest = Number(str[0])
    if (Number(str[i]) > biggest) {
      biggest = str[i]
    }
  }
  
  return biggest
}

bigNum("12345")
bigNum("87135")