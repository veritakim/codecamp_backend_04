function bigNum(str) {
	let biggest = Number(str[0]);
  
  for (let i = 0; i < str.length; i++) {
    if (Number(str[i]) > biggest) {
      biggest = Number(str[i])
    }
  }
  
  return biggest
}

bigNum("12345")
bigNum("87135")