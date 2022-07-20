// public, private, protected, readonly

// 1.public

class Aaa1 {
  constructor(public mypower) {
    // mypower를 Public으로 선언하면 자식이 수정도 가능 안에서 다 사용가능
    // this.mypower = mypower; // public, private, readonly 등 1개만 포함되면 자동으로 셋팅됨
  }
  ggg() {
    console.log(this.mypower); // 안에서 접근 가능
    this.mypower = 10; // 안에서 수정 가능
  }
}

class Aaa2 extends Aaa1 {
  ggg() {
    console.log(this.mypower); // 자식이 접근 가능
    this.mypower = 10; // 자식이 수정 가능
  }
}

const aaaa = new Aaa2(50);
console.log(aaaa.mypower); // 밖에서도 접근 가능
aaaa.mypower = 10;

// protected
/*
class Aaa1 {
  constructor(protected mypower) { // mypower를 Public으로 선언하면 자식이 수정도 가능 안에서 다 사용가능
    // this.mypower = mypower; // public, private, readonly 등 1개만 포함되면 자동으로 셋팅됨
  }
  ggg() {
    console.log(this.mypower); // 안에서 접근 가능
    this.mypower = 10; // 안에서 수정 가능
  }
}

class Aaa2 extends Aaa1 {
  ggg() {
    console.log(this.mypower); // 자식이 접근 가능
    this.mypower = 10; // 자식이 수정 가능
  }
}

const aaaa = new Aaa2(50); 
console.log(aaaa.mypower); // 밖에서도 접근 불가
aaaa.mypower = 10; // 밖에서 수정 불가

*/

// private
/*
class Aaa1 {
  constructor(private mypower) { // mypower를 Public으로 선언하면 자식이 수정도 가능 안에서 다 사용가능
    // this.mypower = mypower; // public, private, readonly 등 1개만 포함되면 자동으로 셋팅됨
  }
  ggg() {
    console.log(this.mypower); // 안에서 접근 가능
    this.mypower = 10; // 안에서 수정 가능
  }
}

class Aaa2 extends Aaa1 {
  ggg() {
    console.log(this.mypower); // 자식이 접근 불가
    this.mypower = 10; // 자식이 수정 불가
  }
}

const aaaa = new Aaa2(50); 
console.log(aaaa.mypower); // 밖에서도 접근 불가
aaaa.mypower = 10; // 밖에서 수정 불가


// readonly
class Aaa1 {
  constructor(readonly mypower) {
    // mypower를 Public으로 선언하면 자식이 수정도 가능 안에서 다 사용가능
    // this.mypower = mypower; // public, private, readonly 등 1개만 포함되면 자동으로 셋팅됨
  }
  ggg() {
    console.log(this.mypower); // 안에서 접근 가능
    this.mypower = 10; // 안에서 수정 불가
  }
}

class Aaa2 extends Aaa1 {
  ggg() {
    console.log(this.mypower); // 자식이 접근 가능
    this.mypower = 10; // 자식이 수정 불가
  }
}

const aaaa = new Aaa2(50);
console.log(aaaa.mypower); // 밖에서도 접근 가능
aaaa.mypower = 10; // 밖에서 수정 불가

// private readonly 나만 쓰고 나도 수정을 할 수 없다.
*/


let string = [1, 2, 3] || ["asd", "asd"]