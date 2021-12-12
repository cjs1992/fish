class Sprite {
  constructor(d = {}) {
    const me = this

    Object.assign(me, d)

    d.el = pList[d.link]

    for (let key in d) {
      me[key] = d[key]
    }
  }
  nextFrame(scene) {
    
  }
}