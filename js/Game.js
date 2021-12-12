const me = new Scene({
  canvas: document.getElementById('canvas'),
  cannons: Array(14).fill().map((_, idx) => {
    return new Cannon({
      link: 'cannon' + (idx % 7 + 1),
    })
  })
})

me.init().then((me) => {
  setInterval(() => {
    const row = Math.ceil(me.w / 50)
    const col = Math.ceil(me.h / 50)
    const maxFish = row * col
    // const maxFish = 10
    const perFish = Math.ceil(maxFish / 100)

    document.title = 'max:' + maxFish + ' len:' + me.fishs.length + ' fps:' + me.fps + ' per:' + perFish
    
    if (me.fps < 50) return
    if (me.fishs.length >= maxFish) return

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

      const cx = me.w / 2
      const cy = me.h / 2
      const angle = rand(0, 360)

      let x1 = 0
      let y1 = 0

      let l = -el.width / 2
      let r = me.w + el.width / 2

      let t = -el.height / 2
      let b = me.h + el.height / 2

      if (Math.random() < .5) {
        // 左右
        x1 = Math.random() < .5 ? l : r
        y1 = rand(t, b)
      } else {
        // 上下
        x1 = rand(l, r)
        y1 = Math.random() < .5 ? t : b
      }

      const x3 = rand(0, me.w)
      const y3 = rand(0, me.h)

      me.fishs.push(new Fish({
        link,
        // usingCurve: true,
        v: rand(300, 1000) / 500,
        points: [
          {x: x1, y: y1},
          {x: me.w / 2, y: me.h / 2},
          {x: x3, y: y3},
        ]
      }))
    }
  }, 300)
})
