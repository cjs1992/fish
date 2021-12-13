class Sprite {
  constructor(d = {}) {
    const me = this

    d.el = pList[d.link]
    d.curFrame = 0
    Object.assign(me, d)
  }
  nextFrame(scene) {
    
  }
}