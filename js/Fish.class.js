class Fish extends Sprite {
  constructor() {
    super(...arguments)

    const me = this
    const [
      {x: x1, y: y1},
      {x: x2, y: y2},
      {x: x3, y: y3},
    ] = me.points
    const el = me.el

    me.isFish = true
    me.v = me.v || 0
    me.blood = el.blood
    me.fric = Math.ceil(10 - me.v / 2)
    me.fric < 1 && (me.fric = 1)

    if (me.usingCurve) {

    } else {
      const angle = me.rotation = Math.atan2(y3 - y1, x3 - x1)
      me.x = me.x || x1
      me.y = me.y || y1
      me.vx = Math.cos(angle) * me.v
      me.vy = Math.sin(angle) * me.v
    }
  }
  nextFrame(scene) {
    const me = this
    const el = me.el

    scene.countFrame % me.fric === 0 && me.curFrame++

    if (me.isDie && me.curFrame >= me.el.totalFrame) {
      scene.fishs.remove(me)
      return
    }

    if (me.usingCurve) {

    } else {
      me.x += me.vx
      me.y += me.vy
    }

    if (
      me.x < -el.width / 2 || me.x > scene.w + el.width / 2 ||
      me.y < -el.height / 2 || me.y > scene.h + el.height / 2
    ) {
      scene.fishs.remove(me)
    }
  }
}