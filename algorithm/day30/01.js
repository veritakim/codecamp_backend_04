// const leftNumbers = [1, 4, 7] // 왼손 키패드에 해당하는 숫자
// const rightNumbers = [3, 6, 9]

const [leftNumbers, rightNumbers] = [
  [1, 4, 7],
  [3, 6, 9],
];

function solution(numbers, hand) {
  // 두 손가락의 위치를 저장
  const current = {
    left: 10,
    right: 12,
  };

  const answer = numbers.reduce((acc, cur) => {
    let [useFingers, target, number] = ["", "", 0];

    if (leftNumbers.includes(cur)) {
      [useFingers, target, number] = ["L", "left", cur];
    } else if (rightNumbers.includes(cur)) {
      [useFingers, target, number] = ["R", "right", cur];
    } else {
      // 가운데 키패드를 누르는 경우
      const fingers = Object.entries(current).reduce((acc2, cur2) => {
        const targetHand = cur2[0];
        cur = cur === 0 ? 11 : cur;
        let location = Math.abs(cur - cur2[1]);
        // 위 아래로 움직이는 경우
        if (location > 2) {
          location = Math.trunc(location / 3) + (location % 3);
        }

        acc2[targetHand] = location;
        return acc2;
      }, {});

      if (fingers.left === fingers.right) {
        [useFingers, target, number] = [hand === "left" ? "L" : "R", hand, cur];
      } else if (fingers.left > fingers.right) {
        [useFingers, target, number] = ["R", "right", cur];
      } else {
        [useFingers, target, number] = ["L", "left", cur];
      }
    }

    current[target] = number;
    return acc + useFingers;
  }, "");

  return answer;
}
