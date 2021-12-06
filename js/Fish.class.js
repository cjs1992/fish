class Fish extends Sprite {
  constructor(link, d = {}) {
    super(...arguments)
  }
  nextFrame(countFrame) {
    const me = this
    const d = me.d

    countFrame % d.fric === 0 && d.countFrame++

  }
}