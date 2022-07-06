function makeOdd(num) {

  let str = '' 

  for (let i = 1; i <= num; i++) {
      if (i % 2 !== 0){
          str += i
      }
  }

  return str
}