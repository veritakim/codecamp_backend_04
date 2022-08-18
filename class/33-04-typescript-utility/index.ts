interface IProfile {
  name: string;
  age: number;
  school: string;
  hobby?: string;
}

// 💚 타입으로 만들기

type AAA = {
  name: string;
  age: number;
  school: string;
  hobby?: string;
};

// 두 개의 차이
/**
 * interface는 선언 변합이 가능하다.
 */
interface IProfile {
  apple: string;
}

const myProfile: IProfile = {
  age: 5,
  school: "떡잎유치원",
  name: "철수",
};
