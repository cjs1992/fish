class Coin extends Sprite {
  constructor() {
    super(...arguments)

    const me = this

    me.isGold = /2$/.test(me.link)
    me.isCoin = true
    me.fric = 3
  }
  nextFrame(scene) {
    const me = this
    const btm = scene.bottoms[0]
    let {x: tox, y: toy} = btm

    tox += btm.el.width / 2
    scene.countFrame % me.fric === 0 && me.curFrame++

    if (me.curFrame < 10) return

    let vx = (tox - me.x) / 20
    let vy = (toy - me.y) / 20

    vx = vx > 0 ? Math.ceil(vx) : Math.floor(vx)
    vy = vy > 0 ? Math.ceil(vy) : Math.floor(vy)

    me.x += vx
    me.y += vy

    if (Math.abs(tox - me.x) < 1 && Math.abs(toy - me.y) < 1) {
      scene.coins.remove(me)
      scene.score += me.isGold ? 10 : 1
    }
  }
}