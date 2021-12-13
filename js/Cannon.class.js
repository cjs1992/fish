class Cannon extends Sprite {
  constructor() {
    super(...arguments)

    const me = this

    me.isCannon = true
    me.fric = 2
  }
  nextFrame(scene) {
    const me = this

    if (me.curFrame < 5 && scene.countFrame % me.fric === 0) {
      me.curFrame++
    }
  }
}