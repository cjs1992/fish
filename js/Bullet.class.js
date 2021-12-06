class Bullet extends Sprite {
  constructor(link, d = {}) {
    super(...arguments)
  }
  nextFrame(root, countFrame) {
    const me = this
    const d = me.d
    const timeDis = Date.now() - d.timeStart
    const scale = timeDis / d.duration

    if (timeDis < d.duration) {
      const p = d.path.getPointAtLength(scale * d.totalLength)
      const p2 = d.path.getPointAtLength(scale * d.totalLength + 4)

      const x1 = p.x
      const y1 = p.y

      const x2 = p2.x
      const y2 = p2.y

      d.angle = d2a(a2d(Math.atan2(y2 - y1, x2 - x1)) + 90)

      d.x = p.x
      d.y = p.y
    } else {
      // stop
      root.d.bullets.remove(me)
      // root.d.svg.removeChild(d.path)
    }
  }
}