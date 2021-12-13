class Net extends Sprite {
  constructor() {
    super(...arguments)

    const me = this

    me.isNet = true
    me.fric = 1
  }
  nextFrame(scene) {
    const me = this
    const d = me.d

    scene.countFrame % me.fric === 0 && me.curFrame++

    if (me.curFrame > 10) {
      scene.nets.remove(me)
      return
    }

    const scale = .5 + (me.curFrame > 5 ? 5 - me.curFrame + 5 : me.curFrame) / 8
    me.scale = [scale, scale]
  }
}