function makeNumber(num) {
  let str = ''

  for ( let i = 1; i <= num; i++ ) {
      if (i < num) {
          str += i + '-'
      } else str += i
  } 

  return str
}