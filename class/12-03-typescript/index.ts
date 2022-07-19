// 타입추론
let aaa = "안녕하세요";
// aaa = 3;

// 타입명ㅅㅣ
let bbb: string = "반갑습니다";

// 타입명시가 필요한 상황
let ccc: number | string = 1000;
ccc = "1000원";

// 숫자타입
let ddd: number = 3;
// ddd = "andy";

// boolean
let eee: boolean = true;
// eee = "false"; // js일때 true로 작동한다.

// array
let fff: number[] = [1, 2, 3, 4, 5];
// fff.push("안녕하세요");

let ggg: string[] = ["마크", "제노", "런쥔", 1];
let hhh: (number | string)[] = ["마크", "제노", "런쥔", 1];

// 객체 타입
interface IProfile {
  name: string;
  age: number | string;
  hobby?: string;
}

let profile: IProfile = {
  name: "지성",
  age: 8,
};

profile.age = "8살";
profile.hobby = "영화보기";

// 함수타입
const add = (money1: number, money2: number, unit: string): string => {
  return money1 + money2 + unit;
};

const result = add(1000, 2000, "달러");
