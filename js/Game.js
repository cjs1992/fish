const me = new Game({
  svg: document.getElementById('svg'),
  canvas: document.getElementById('canvas'),
  pList,
  cannon: Array(21).fill().map((_, idx) => {
    return new Cannon('cannon' + (idx % 7 + 1))
  })
}, (me, d) => {
  let iLeft = 0

  d.fish = Array(15).fill().map((_, idx) => {
    const id = idx % 12 + 1
    const el = pList['fish' + id]
    const iLeft_ = iLeft

    iLeft += el.width + 2

    return new Fish('fish' + id, {
      x: iLeft_ + el.width / 2,
      y: d.h / 2,
    })
  })

  me.render()
})

const d = me.d
const canvas = d.canvas
const gd = d.gd
