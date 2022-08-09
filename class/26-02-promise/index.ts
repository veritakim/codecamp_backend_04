// 1. promise 예제
/*
const aaa = new Promise((resolve, reject) => {
  // 시간이 걸리는 작업 (API 보내기 등)
  if (성공) {
    const result = "철수";
    resolve(result);
  } else if (실패) {
    reject("에러가 발생했어요");
  }
});
*/

// 2. 내가 axios 개발자라면?
/*
const myAxios = {
  get: (url) =>
    new Promise((resolve, reject) => {
      // 백엔드 API 요청
    }),
  post: (url) =>
    new Promise((resolce, reject) => {
      // 백엔드 API 요청
    }),
};

await myAxios.get("url");
*/

// 3. Promise 실습해보기
// data를 요청하는 함수
const fetchData = async () => {
  // 끝났을 때 로직을 실행하게..
  // aaa.then()
  // const result = await aaa.then((res) => res); // res는 resolve된 값 철수

  // 오래 걸리는 작업
  const response = await new Promise((resolve, reject) => {
    setTimeout(() => {
      // 2초가 걸려서 백엔드에서 데이터 받아옴
      const result = "철수";
      resolve(result);
    }, 2000);
  });

  console.log("완료된 값은 " + response);
};
fetchData();
