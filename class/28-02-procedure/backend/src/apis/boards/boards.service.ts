import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardService {
  // getHello(): string {
  //   return 'Hello Board!';
  // }

  findAll() {
    const result = [
      {
        number: 1,
        writer: '짱구',
        title: '초코비 먹을사람',
        contents: '나 혼자 먹을겁니다 호호~잇',
      },
      {
        number: 2,
        writer: '흰둥이',
        title: '흰둥이 산책시킬 사람',
        contents: '산책 시켜주세요',
      },
      {
        number: 3,
        writer: '훈이',
        title: '훈이는 주먹밥',
        contents: '훈이 주먹밥',
      },
    ];

    return result;
  }

  create({ createBoardInput }) {
    console.log(createBoardInput.writer);
    console.log(createBoardInput.title);
    console.log(createBoardInput.contents);
    // 2. 저장한 결과 응답 돌려주기.
    return '게시물 등록에 성공했습니다!';
  }
}
