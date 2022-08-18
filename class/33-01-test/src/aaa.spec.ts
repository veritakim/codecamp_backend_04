// 1. 1개 테스트하기
// 테스트 이름   기능
it('더하기 테스트', () => {
  const a = 1;
  const b = 2;

  expect(a + b).toBe(3);
});

// 2. 여러 개 묶음으로 테스트하기
describe('나의 테스트 그룹', () => {
  it('더하기 테스트2', () => {
    const a = 1;
    const b = 3;

    expect(a + b).toBe(4);
  });
  it('곱하기 테스트2', () => {
    const a = 1;
    const b = 3;

    expect(a * b).toBe(3);
  });
});

// 3. 상품 구매하기 테스트 예제
describe('상품 구매하기 테스트', () => {
  // 밑에 하기 전에 검증해주세요
  beforeEach(() => {
    // 로그인 로직 작성
  });
  it('돈 검증하기', () => {
    const result = true; // 돈이 많다고 가정
    expect(result).toBe(true);
  });
  it('상품 구매하기', () => {
    const result = true; // 상품을 구매했다고 가정
    expect(result).toBe(true);
  });
});
