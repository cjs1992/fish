class Fish extends Sprite {
  constructor(link, d = {}) {
    super(...arguments)

    d = this.d
    d.v = d.v || 0
    d.fric = d.v ? Math.ceil(10 - d.v) : 8
    d.curFrame = 0
    d.isAlive = true
    d.blood = d.el.blood

    const [
      {x: x1, y: y1},
      {x: x2, y: y2},
      {x: x3, y: y3},
    ] = d.points || Array(3).fill({})

    if (d.usingCurve) {
      const g = document.createElementNS(d.svgNS, 'g')

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
    } else {
      // 计算斜率
      d.rotation = Math.atan2((y3 - y1), (x3 - x1))
      d.vx = Math.cos(d.rotation) * d.v
      d.vy = Math.sin(d.rotation) * d.v
      d.x = d.x || x1
      d.y = d.y || y1
      // console.log(d.x, d.y)
    }
  }
  nextFrame(scene) {
    const me = this
    const d = me.d

    scene.d.countFrame % d.fric === 0 && d.curFrame++

    if (!d.isAlive) {
      // 鱼死了
      if (d.curFrame === d.el.frameDie[1] + 1) {
        scene.d.fishs.remove(me)
      }
      return
    } else {
      d.curFrame %= (d.el.frameAlive[1] + 1)
    }


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
        d.rotation = Math.atan2(y2 - y1, x2 - x1)
      } else {
        scene.d.fishs.remove(me)
      }
    } else {
      d.x += d.vx
      d.y += d.vy

      if (
        d.x < -d.el.width || d.x > scene.d.w + d.el.width ||
        d.y < -d.el.height || d.y > scene.d.h + d.el.height
      ) {
        scene.d.fishs.remove(me)
      }
    }
  }
}