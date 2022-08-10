// import로 갖고오지 못해서 require로 데려옴.
const { Storage } = require("@google-cloud/storage");
// package.json에 sharp 추가해준다. 그것을 데려온다.
const sharp = require("sharp");

// helloGCS 안에 선언해주니까 찾지를 못해서 밖에 뺐더니 됐다.. 왤까..
const storage = new Storage().bucket("codecamp-be04-storage");

exports.helloGCS = async (event, context) => {
  // event.name에 thumb/thumb/thumb... 계속 생겨서
  // event.name에 더이상 계속 thumb/thumb가 오지 않게 return
  if (event.name.includes("thumb")) return;

  // 폴더에 들어갈 size와 변경할 width를 배열과 객체에 담았다.
  const resized = [
    { size: "s", width: 320 },
    { size: "m", width: 640 },
    { size: "l", width: 1280 },
  ];

  const gcsEvent = event;
  // console.log(`Processing file: ${gcsEvent.name}`);
  // console.log(`event!!!!!!!: ${JSON.stringify(event)}`);
  // console.log(`context: ${JSON.stringify(context)}`);

  // event를 기다려야하나 싶었지만 아니였다.
  // const waitedFiles = await Promise.all(gcsEvent)

  // const bucket = 'codecamp-be04-storage'
  // const filename = event.name

  // filename이 thumb/thumb/thumb .... 계속 thumb 폴더가 무한증식.. 왤까....
  // 위에서 처리해줬다.
  // console.log(`!!!!!!!!!filename: ${event.name} !!!!!!!!`)

  // s,m,l 같이 promise all 해주기
  // promise만 했을 때는 느렸는데 Promise.all을 해주니 빠르다.
  await Promise.all(
    resized.map(
      (el) =>
        // 엄청 느리다...
        new Promise((resolve, reject) => {
          // 프로미스 시작
          // console.log("========뉴프로미스=========")
          // storage에 있는 file 읽어주기
          storage
            .file(event.name)
            .createReadStream()
            // 파일 저장 전에 sharp로 사이즈 조정해주기
            .pipe(sharp().resize({ width: el.width }))
            // storage thumb/el.size/event.name 으로 스토리지에 올려준다.
            .pipe(
              storage.file(`thumb/${el.size}/${event.name}`).createWriteStream()
            )
            .on("finish", () => resolve("성공"))
            .on("error", () => reject("실패"));
        })
    )
  );
};
