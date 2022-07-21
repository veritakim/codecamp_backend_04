import { Injectable } from '@nestjs/common';

@Injectable()
export class StarBuckService {
  createCoffee({ createStarbucksInput }): string {
    for (const i in createStarbucksInput) {
      console.log(i + ':' + createStarbucksInput[i]);
    }
    return '등록에 성공하였습니다.';
  }

  findStarbucks() {
    const result = [
      {
        menu: '아메리카노',
        price: '4500원',
        kcal: '5',
        saturated_fat: '0',
        protein: '0',
        salt: '0',
        sugar: '0',
        caffeine: '75',
      },
      {
        menu: '민트 초콜릿 칩 블렌디드',
        price: '5800원',
        kcal: '455',
        saturated_fat: '14',
        protein: '9',
        salt: '190',
        sugar: '52',
        caffeine: '75',
      },
      {
        menu: '쿨 라임 피지오',
        price: '5600원',
        kcal: '105',
        saturated_fat: '0',
        protein: '0',
        salt: '20',
        sugar: '25',
        caffeine: '110',
      },
    ];
    return result;
  }
}
