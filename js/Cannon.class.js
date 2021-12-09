class Cannon extends Sprite {
  constructor(link, d = {}) {
    super(...arguments)

    d.fric = 10
    d.curFrame = 5
    d.fric = 4
  }
  nextFrame(scene) {
    const me = this
    const d = me.d

    scene.d.countFrame % d.fric === 0 && d.curFrame++
  }
}