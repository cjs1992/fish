class Sprite {
  constructor(link, d = {}) {
    const me = this

    d.link = link
    d.x = d.x || 0
    d.y = d.y || 0
    d.fric = d.fric || 10
    d.countFrame = d.countFrame || 10

    me.d = d
  }
  nextFrame() {
    const me = this
    const d = me.d
    
  }
}