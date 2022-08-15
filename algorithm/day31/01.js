for (let i = 0; i < report.length; i++) {
  const info = report[i].split(" ");

  if (reporter[info[0]] === undefined) {
    reporter[info[0]] = [];
  }

  if (reportList[info[1]] === undefined) {
    reportList[info[1]] = 0;
  }

  // 중복신고 제거
  /*
  if ( reporter[info[0]].includes( info[1] ) === false ) {
    reporter[ info[0] ].push(info[1])
    reportList[info[1]]++
  }
  */

  reporter[info[0]].push(info[1]);
  reportList[info[1]]++;
}

for (let j = 0; j < id_list.length; j++) {
  const arr = reporter[id_list[j]] || [];

  answer[j] = 0;
  for (let l = 0; l < arr.length; l++) {
    if (reportList[arr[l]] >= k) {
      answer[j]++;
    }
  }
}

return answer;

function solution(id_list, report, k) {
  const reporter = {}; // 신고한 사람이 누구를 했는지 저장
  const reportList = {}; // 신고 당한 사람의 누적 신고량

  report = Array.from([...new Set(report)]);

  report.forEach((el) => {
    el = el.split(" ");

    // 신고한 사람의 정보가 undefined라면
    if (!reporter[el[0]]) {
      reporter[el[0]] = [];
    }
    if (!reportList[el[1]]) {
      reportList[el[1]] = 0;
    }

    reporter[el[0]].push(el[1]);
    reportList[el[1]]++;
  });

  const answer = id_list.map((id) => {
    const arr = reporter[id] || [];
    // console.log(id, arr)
    return arr.reduce((acc, cur) => {
      return acc + (reportList[cur] >= k ? 1 : 0);
    }, 0);
  });

  return answer;
}
