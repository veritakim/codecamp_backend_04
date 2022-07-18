const aaa = new Date()
aaa.getFullYear()
aaa.getMonth() + 1


class Monster {
  power = 10
  // 
  constructor(aaa) {
    this.power = aaa
  }

  attack = () => {
    console.log("공격하자")
    console.log("내 공격력은" + this.power)
  }
}

// 11
class SkyMonster extends Monster {
  constructor(qqq) {
    super(qqq)
  }
  run = () => {
    console.log("날아서 도망가자")
  }
}

class GroundMonster extends Monster {
  constructor(qqq) {
    super(qqq)
  }
  run = () => {
    console.log("뛰어서 도망가자")
  }
}

// 공중 괴물 - 도망갈때 날아서
const mymonster1 = new SkyMonster(10)
mymonster1.attack()
mymonster1.run()

// 지상 괴물 - 도망갈때 뛰어서
const mymonster2 = new GroundMonster(50)
mymonster2.attack()
mymonster2.run()