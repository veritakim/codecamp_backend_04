const aaa = new Date()
aaa.getFullYear()
aaa.getMonth() + 1


class Monster {
  power = 10
  // 
  constructor(aaa) {
    this.power = aaa
  }
  run =  () => {
    console.log("도망기지")
    console.log("내 공격력은" + this.power)
  }

  attack = () => {
    console.log("공격하자")
  }
}

const mymonster1 = new Monster(10)
mymonster1.attack()
mymonster1.run()

const mymonster2 = new Monster(50)
mymonster2.attack()
mymonster2.run()