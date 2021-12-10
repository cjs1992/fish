const me = new Scene({
  canvas: document.getElementById('canvas'),
  pList,
  cannons: Array(14).fill().map((_, idx) => {
    return new Cannon('cannon' + (idx % 7 + 1), {
      listScope: 'cannons'
    })
  })
}, (me, d) => {
  {
    // const el = d.el
    // let iLeft = 0

    // for (let i = 0; i < 12; i++) {
    //   const link = 'fish' + (i + 1)
    //   const el = pList[link]
    //   const iLeft_ = iLeft
    //   iLeft += pList[link].width
    //   d.fishs.push(new Fish(link, {
    //     points: [
    //       {x: iLeft_ + el.width / 2, y: d.h / 2},
    //       {x: 0, y: 0},
    //       {x: d.w, y: d.h / 2},
    //     ]
    //   }))
    // }
  }

  setInterval(() => {
    const row = Math.ceil(d.w / 50)
    const col = Math.ceil(d.h / 50)
    const maxFish = row * col
    // const maxFish = 10
    const perFish = Math.ceil(maxFish / 100)

    document.title = 'max:' + maxFish + ' per-' + perFish + ' len-' + d.fishs.length
    if (d.fishs.length > maxFish) return

    for (let i = 1; i <= perFish; i++) {
      let n = rand(1, 4096)

      for (let j = 11; j > -1; j--) {
        if (n > Math.pow(2, j)) {
          n = 12 - j
          break
        }
      }

      const link = 'fish' + n
      const el = pList[link]

      const cx = d.w / 2
      const cy = d.h / 2
      const angle = rand(0, 360)

      let x1 = 0
      let y1 = 0

      let l = -el.width / 2
      let r = d.w + el.width / 2

      let t = -el.height / 2
      let b = d.h + el.height / 2

      if (Math.random() < .5) {
        // 左右
        x1 = Math.random() < .5 ? l : r
        y1 = rand(t, b)
      } else {
        // 上下
        x1 = rand(l, r)
        y1 = Math.random() < .5 ? t : b
      }

      const x3 = rand(0, d.w)
      const y3 = rand(0, d.h)

      d.fishs.push(new Fish('fish' + n, {
        // usingCurve: true,
        v: rand(300, 1000) / 500,
        points: [
          {x: x1, y: y1},
          {x: d.w / 2, y: d.h / 2},
          {x: x3, y: y3},
        ]
      }))
    }
  }, 300)

  // setInterval(() => {
  //   me.handleStart({
  //     clientX: d.w / 2,
  //     clientY: d.h / 5,
  //   })
  // }, 150)
})

const d = me.d
const canvas = d.canvas
const gd = d.gd
