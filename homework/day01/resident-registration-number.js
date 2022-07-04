function checkMinus(num) {
  if(num.indexOf("-") !== 6) {
    console.log("”에러 발생!!! 형식이 올바르지 않습니다!!!”")
    return false
  } else {
    return true
  }
}

function checkCountNumber(num) {
  const registerNum = num.split("-")

  if (registerNum[0].length !== 6 || registerNum[1].length !== 7) {
    console.log("에러 발생!!! 개수를 제대로 입력해 주세요!!!")
    return false
  } else {
    return true
  }
}

function checkValidationNumber(num) {
  if (num.indexOf("-") === -1) {
    console.log("에러 발생!!! 형식이 올바르지 않습니다!!!")
    return false
  } else {
    return true
  }
}

function createRegisterNumber(num) {
  let arr = num.split('')
  let answer = ""
  arr.map((el, index) => {
    if (index > 7) {
        el = "*"
    }
    answer += el
  })

  return answer
}

function customRegistrationNumber(num) {
  const checkMinuseIndex = checkMinus(num)
  if (!checkMinuseIndex) return

  const registerNum = checkCountNumber(num)
  if(!registerNum) return

  const validationNumber = checkValidationNumber(num)
  if(!validationNumber) return

  const myRegisterNum = createRegisterNumber(num)
  console.log(myRegisterNum)
}

// customRegistrationNumber("210510-1010101")
// customRegistrationNumber("210510-1010101010101")
customRegistrationNumber("2105101010101")