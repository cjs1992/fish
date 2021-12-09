class Bullet extends Sprite {
  constructor(link, d = {}) {
    super(...arguments)

    const x1 = d.x1
    const y1 = d.y1

    const x4 = d.x4
    const y4 = d.y4

    d.v = d.v || 6

    if (d.usingCurve) {
      const x2 = x4
      const y2 = (y1 + y4) / 2

      const x3 = x1
      const y3 = (y1 + y4) / 2

      const points = d.points = [
        {x: x1, y: y1},
        {x: x2, y: y2},
        {x: x3, y: y3},
        {x: x4, y: y4},
      ]
      const ns = 'http://www.w3.org/2000/svg'
      const g = document.createElementNS(ns, 'g')

      g.innerHTML = `
        <path
          d="M ${x1} ${y1} C ${x2} ${y2}, ${x3} ${y3}, ${x4} ${y4}"
          fill="transparent"
          stroke-width="2"
          stroke="wheat"
        ></path>
      `.trim()

      d.x = x1
      d.y = y1
      d.path = g.children[0]
      d.totalLength = d.path.getTotalLength()
      d.curLength = 0
    } else if (d.v) {
      // 计算斜率
      const rotation = Math.atan2((y4 - y1), (x4 - x1))
      d.vx = Math.cos(rotation) * d.v
      d.vy = Math.sin(rotation) * d.v
      d.rotation = d2a(a2d(rotation) + 90)
    }
  }
  nextFrame(scene) {
    const me = this
    const d = me.d

    if (d.usingCurve) {
      d.curLength += d.v

      const len1 = d.curLength
      const len2 = len1 + 3

      const p1 = d.path.getPointAtLength(len1)
      const p2 = d.path.getPointAtLength(len2)

      const x1 = d.x = p1.x
      const y1 = d.y = p1.y

      const x2 = d.x = p2.x
      const y2 = d.y = p2.y

      if (len2 < d.totalLength) {
        // 继续前进
        d.rotation = d2a(a2d(Math.atan2(y2 - y1, x2 - x1)) + 90)
      } else {
        // stop
        scene.d[me.d.listScope].remove(me)
      }
    } else {
      d.x += d.vx
      d.y += d.vy

      if (
        d.x < 0 || d.x > scene.d.w ||
        d.y < 0 || d.y > scene.d.h
      ) {
        scene.d.bullets.remove(me)
      }
    }
  }
}