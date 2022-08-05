function solution(board, moves) {
  let answer = 0;
  const bucket = []; // 뽑은 인혀들이 담겨지는 배열

  // 1. 크레인이 이동하는 위치값을 구하는 반복문
  for (let i = 0; i < moves.length; i++) {
    // console.log(moves[i])
    // 2. 크레인이 이동해서 뽑아올 수 있는 인형의 위치값을 구하는 반복문
    for (let j = 0; j < board.length; j++) {
      // console.log(moves[i], board[j])
      const doll = board[j][moves[i] - 1];
      // console.log(doll, moves[i], board[j])
      // 3. 크레인이 이동하는 위치가 빈칸이 아니라면 (인형이 있다면)
      if (doll !== 0) {
        // 뽑은 인형에 빈칸 만들어주기
        board[j][moves[i] - 1] = 0;
        // 이미 bucket에 같은 인형이 있다면 터트려 주기
        if (bucket[bucket.length - 1] === doll) {
          answer += 2;
          bucket.pop();
          break;
        }

        // 바구니에 뽑은 인형 담아주기
        bucket.push(doll);
        // 인형을 뽑았다면, 같은 위치에 대한 크레인의 동작을 종료
        break;
      }
    }
  }

  return answer;
}

function solution(board, moves) {
  let answer = 0;
  const bucket = []; // 뽑은 인혀들이 담겨지는 배열

  moves.forEach((move, i) => {
    // 반복문 정지된 것처럼 보이게 해주는 변수
    // false일때면 내부의 함수가 동작하게 해주기
    let pick = false;
    board.forEach((location, j) => {
      const doll = location[move - 1];

      if (!pick) {
        // 인형을 뽑은 경우
        if (doll !== 0) {
          location[move - 1] = 0;
          // bucket이 가장 위에 있는 인형과 비교하기
          if (bucket[bucket.length - 1] === doll) {
            bucket.pop();
            answer += 2;
          } else {
            bucket.push(doll);
          }
          pick = true;
        }
      }
    });
  });

  return answer;
}
