let power = 10
let model = '소나타'
let color = 'black'

class Car {
  getcolor = (cc) => {
    this.color = cc
    console.log(`색상은 ${color}입니다.`)
  }
  getmodel = (mm) => {
    this.model = mm
    console.log(`이 차의 기종은 ${model}입니다.`)
  }
  getpower = (pp) => {
    this.power = pp
    console.log(`마력은 ${power}`)
  }
  go = () => {
    console.log("출발하기")
  }
  stop = () => {
    console.log("정지하기")
  }
}

const mycar1 = new Car()
mycar1.getcolor()
mycar1.getmodel()
mycar1.getpower()
mycar1.go()

