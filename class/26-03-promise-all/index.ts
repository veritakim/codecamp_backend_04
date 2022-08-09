const fetchPromise = async () => {
  console.time("=== 개별 Promise 각각 ===");
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("성공1111!!");
    }, 2000);
  });

  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("성공22222!!");
    }, 3000);
  });

  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("성공33333!!");
    }, 1000);
  });

  console.timeEnd("=== 개별 Promise 각각 ===");
};

const fetchPromiseAll = async () => {
  console.time("=== 한방 Promise.all ===");

  // await Promise.all([new Promise, new Promise, new Promise])
  const result = await Promise.all([
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("성공1111!!");
      }, 2000);
    }),

    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("성공22222!!");
      }, 3000);
    }),

    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("성공33333!!");
      }, 1000);
    }),
  ]);

  console.log(result);
  console.timeEnd("=== 한방 Promise.all ===");
};

fetchPromise();
fetchPromiseAll();
