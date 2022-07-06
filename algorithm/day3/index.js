// 조건문
/*
  if로 시작하며, 소괄호 안에 조건식이 들어간다

  const a = 2

  if ( a > 1 ) {
    console.log( "a 가 1보다 크다." )
  } else {
    a가 1보다 작다.
  }

  조건식이 일치할 경우(=true) 로직이 실행된다.
  a는 1보다 크니까 조건이 성립되어 a가 1보다 크다가 출력된다.

  만약 a가 1이라면?? 
  조건이 하나 더 들어가야 하기 때문에 else if를 사용해 준다.


  const a = 1

  if ( a > 1 ) {
    console.log( "a 가 1보다 크다." )
  } else if ( a === 1) {
    console.log( "a는 1이다." )
  } else {
    a가 1보다 작다.
  }
 */

// switch 
/*
  const day = "월요일"
  switch (day) {
    case "월요일" :
      console.log(`${day}입니다.`) 
      break
     default : 
      console.log("월요일이 아닙니다.")
  } 

  모든 케이스를 체크하고 가장 마지막에 있는 로직을 실행시킨다.
  올바른 케이스를 만났을 때 멈춰야하기 때문에 break를 사용해준다.

  
*/
