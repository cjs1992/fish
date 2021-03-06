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
    const totalFrame = 16
    const half = totalFrame / 2

    scene.countFrame % me.fric === 0 && me.curFrame++

    if (me.curFrame > totalFrame) {
      scene.nets.remove(me)
      return
    }

    const scale = (me.curFrame > half ? half - me.curFrame + half : me.curFrame) / half
    me.scale = [scale, scale]
  }
}