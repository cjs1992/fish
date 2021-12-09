class Sprite {
  constructor(link, d = {}) {
    const me = this

    me.d = d
    d.link = link
    d.el = pList[d.link]
    d.x = d.x || d.x1 || 0
    d.y = d.y || d.y1 || 0
    d.curFrame = 0
    d.fric = 10

    d.isCannon = /cannon/i.test(d.link)
    d.isBullet = /bullet/i.test(d.link)
    d.isFish = /fish/i.test(d.link)
  }
  nextFrame(scene) {
    const me = this
    const d = me.d
    const countFrame = scene.d.countFrame
    
    if (d.vx || d.vy) {
      d.x += d.vx
      d.y += d.vy
    }
  }
}