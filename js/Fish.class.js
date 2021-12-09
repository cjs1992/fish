class Fish extends Sprite {
  constructor(link, d = {}) {
    super(...arguments)

    // d.v = Math.ceil(d.v) || 10

    const [
      {x: x1, y: y1},
      {x: x2, y: y2},
      {x: x3, y: y3},
    ] = d.points

    d.fric = d.v ? Math.ceil(10 - d.v) : 8
    d.curFrame = 0

    if (d.usingCurve) {
      const ns = 'http://www.w3.org/2000/svg'
      const g = document.createElementNS(ns, 'g')

      g.innerHTML = `
        <path
          d="M ${x1} ${y1} Q ${x2} ${y2}, ${x3} ${y3}"
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
      const rotation = d.rotation = Math.atan2((y3 - y1), (x3 - x1))
      d.vx = Math.cos(rotation) * d.v
      d.vy = Math.sin(rotation) * d.v
      d.x = d.x || x1
      d.y = d.y || y1
    }
  }
  nextFrame(scene) {
    const me = this
    const d = me.d

    // console.log(scene.d.countFrame, d.fric)
    scene.d.countFrame % d.fric === 0 && d.curFrame++
    d.curFrame %= (d.el.frameAlive[1] + 1)

    if (!d.v) return

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
        d.rotation = Math.atan2(y2 - y1, x2 - x1)
      } else {
        // stop
        scene.d.fishs.remove(me)
      }
    } else {
      const elW = d.el.width * 2

      d.x += d.vx
      d.y += d.vy

      if (
        d.x < -elW || d.x > scene.d.w + elW ||
        d.y < -elW || d.y > scene.d.h + elW
      ) {
        scene.d.fishs.remove(me)
      }
    }
  }
}