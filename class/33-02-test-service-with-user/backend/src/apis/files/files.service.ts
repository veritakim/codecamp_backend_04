import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
  async upload({ files }) {
    // 파일을 클라우드 스토리지에 저장하는 로직
    console.log(files);
    // 기다리고 끝나면 또 기다리기
    /*
    const aaa = await files[0];
    const bbb = await files[1];
    */

    // 한 방에 files[0] , files[1] 기다리기
    const waitedFiles = await Promise.all(files);
    console.log(waitedFiles); // [files[0], files[1]]

    const storage = new Storage({
      projectId: 'united-blend-358105',
      keyFilename: 'gcp-file-storage.json',
    }).bucket('codecamp-be04-storage');

    const bucket = 'codecamp-be04-storage';

    const results = await Promise.all(
      waitedFiles.map(
        (el) =>
          new Promise((resolve, reject) => {
            el.createReadStream()
              .pipe(
                storage.file(el.filename).createWriteStream(), //
              )
              .on('finish', () => resolve(`${bucket}/${el.filename}`)) // 성공하면 성공
              .on('error', () => reject('실패'));
          }),
      ),
    );

    // 파일을 읽기 그 읽은 파일을 pipe에 넘겨줘
    /*
    const result = await Promise.all([
      new Promise((resolve, reject) => {
        waitedFiles[0]
          .createReadStream()
          .pipe(
            storage.file(waitedFiles[0].filename).createWriteStream(), //
          )
          .on('finish', () => resolve('성공')) // 성공하면 성공
          .on('error', () => reject('실패'));
      }),

      new Promise((resolve, reject) => {
        waitedFiles[1]
          .createReadStream()
          .pipe(
            storage.file(waitedFiles[1].filename).createWriteStream(), //
          )
          .on('finish', () => resolve('성공')) // 성공하면 성공
          .on('error', () => reject('실패'));
      }),
    ]);
    */
    return results;
  }
}
