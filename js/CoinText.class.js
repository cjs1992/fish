class CoinText extends Sprite {
  constructor() {
    super(...arguments)

    const me = this
    
    me.isCoinText = true
    me.fric = 1
  }
  nextFrame(scene) {
    const me = this
    const d = me.d
    const totalFrame = 40
    const half = totalFrame / 2

    scene.countFrame % me.fric === 0 && me.curFrame++

    if (me.curFrame > totalFrame) {
      scene.coinTexts.remove(me)
      return
    }

    const scale = me.curFrame < 10 ? me.curFrame / 15 : .67
    me.scale = [scale, scale]
  }
}