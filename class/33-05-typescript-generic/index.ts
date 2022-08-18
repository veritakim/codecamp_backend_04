function getString(arg: string): string {
  return arg;
}

const result1 = getString("철수");

function getNumber(arg: number): number {
  return arg;
}

const result2 = getNumber(7);

function getAny(arg: any): any {
  return arg;
}

const result31 = getAny(7);
const result32 = getAny("철수");
const result33 = getAny(true);

function getAnyReverse(arg1: any, arg2: any, arg3: any): [any, any, any] {
  return [arg3, arg2, arg1];
}

const result311 = getAnyReverse(7, "앤디", "드림초등학교");

// 그룹핑
function getGeneric<MyType>(arg: MyType): MyType {
  return arg;
}

const result41 = getGeneric(7);
const result42 = getGeneric("철수");
const result43 = getGeneric(true);

// prettier-ignore
function getGenericReverse<MyType1, MyType2,MyType3 >(arg1: MyType1, arg2: MyType2, arg3: MyType3): [MyType3, MyType2, MyType1] {
  return [arg3, arg2, arg1];
}

const result44 = getGenericReverse(7, "앤디", "드림초등학교");
