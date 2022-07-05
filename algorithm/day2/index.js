// 배열 : 여러개의 데이터를 묶는 쉼표(,)로 구분되어 배열에 저장된다.
/*
  element : 요소. 배열의 하나의 데이터
  length : 배열 안에 몇개의 데이터가 있는지 확인. 배열의 길이. 숫자 타입 데이터로 표현된다.
  index : 0번부터 시작. 위치값

  배열 안에 객체, 문자열, 숫자, 배열등 여러개의 데이터가 들어 갈 수 있다.
  배열 인덱스 값이 없으면 undefined가 나온다.

  <배열의 메서드>

  데이터추가
  - push 배열 맨뒤에 데이터 추가
  - unshift : 배열 맨 앞에 데이터 추가

  데이터 삭제
  - pop: 배열 맨 뒤에 데이터 삭제
  - shift : 배열 맨 앞에 데이터 삭제

  데이터 조회
  - indexOf("철수") : 데이터의 index값 반환 값이 없으면 (-1)
  - includes("철수") : 데이터 값이 존재하는지 반환 (true / false)

  ... 나머지는 MDN에서 찾아 보자.
*/

// 객체
/*
  key와 value로 데이터를 저장하는데 key는 데이터의 이름, value는 값
  객체의 데이터를 조회할 때는 객체의 key 값을 이용해 조회할 수 있다.

  const obj = {"name": "mark"}
  obj.name = "mark"

  dot notation : 접근할 때 .으로 하는 것을 이라고 한다.
  bracket notation : obj["name"] 라고 접근할 때.

  두 개의 차이점 
  dot은 key값을 그대로 넣어주는데
  bracket은 문자열로 감싸지지 않는 문자가 입력되면 변수로 동작되어 전역 변수를 찾게 된다.

  - 데이터 추가 / 변경
    obj.key = value

  - 데이터 삭제
    delete obj.key
 */