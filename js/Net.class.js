class Net extends Sprite {
  constructor() {
    super(...arguments)

    const me = this
    const d = me.d

    d.curFrame = 0
    d.fric = 1
  }
  nextFrame(scene) {
    const me = this
    const d = me.d

    scene.d.countFrame % d.fric === 0 && d.curFrame++

    if (d.curFrame > 10) {
      scene.d.nets.remove(me)
      return
    }

    const scale = .5 + (d.curFrame > 5 ? 5 - d.curFrame + 5 : d.curFrame) / 8
    d.scale = [scale, scale]
  }
}

