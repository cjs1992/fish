class Bullet extends Sprite {
  constructor() {
    super(...arguments)

    const me = this
    const {x1, y1, x4, y4} = me

    const x2 = x1
    const y2 = (y1 + y4) / 2

    const x3 = x4
    const y3 = (y1 + y4) / 2

    me.points = [
      {x1, y1},
      {x2, y2},
      {x3, y3},
      {x4, y4},
    ]
    me.x = me.x || x1
    me.y = me.y || y1

    if (me.usingCurve) {

    } else {
      const angle = me.rotation = Math.atan2(y4 - y1, x4 - x1)
      me.vx = Math.cos(angle) * me.v
      me.vy = Math.sin(angle) * me.v
    }
  }
  nextFrame(scene) {
    const me = this
    
    if (me.usingCurve) {

    } else {
      me.x += me.vx
      me.y += me.vy

      if (
        me.x < 0 || me.x > scene.w ||
        me.y < 0 || me.y > scene.h
      ) {
        scene.bullets.remove(me)
      }
    }
  }
}