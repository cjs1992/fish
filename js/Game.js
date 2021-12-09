const me = new Scene({
  canvas: document.getElementById('canvas'),
  pList,
  cannons: Array(14).fill().map((_, idx) => {
    return new Cannon('cannon' + (idx % 7 + 1), {
      listScope: 'cannons'
    })
  })
}, (me, d) => {
  let iLeft = 0

  for (let i = 1; i <= 12; i++) {
    const link = 'fish' + i
    const iLeft_ = iLeft
    const el = pList[link]

    iLeft += el.width

    d.fishs.push(new Fish(link, {
      // usingCurve: true,
      // v: 2,
      points: [
        {x: iLeft_ + el.width / 2, y: d.h / 2},
        {x: d.w / 2, y: d.h / 2},
        {x: rand(0, d.w), y: rand(0, d.h)},
      ]
    }))
  }

  // setInterval(() => {
  //   const row = Math.ceil(d.w / 40)
  //   const col = Math.ceil(d.h / 40)
  //   const maxFish = row * col

  //   if (d.fishs.length > maxFish) return

  //   for (let j = 0; j < 50; j++) {
  //     let type = rand(1, 4096)

  //     for (let i = 11; i > -1; i--) {
  //       if (type >= Math.pow(2, i)) {
  //         type = 12 - i
  //         break
  //       }
  //     }

  //     const link = 'fish' + type
  //     const el = pList[link]

  //     let deg1 = rand(0, 3600) / 10
  //     let deg2 = rand(0, 3600) / 10

  //     const angle1 = d2a(deg1)
  //     const angle3 = d2a(deg2)

  //     const x1 = Math.cos(angle1) * d.edgeR + d.w / 2
  //     const y1 = Math.sin(angle1) * d.edgeR + d.h / 2

  //     const x3 = Math.cos(angle3) * d.edgeR + d.w / 2
  //     const y3 = Math.sin(angle3) * d.edgeR + d.h / 2

  //     d.fishs.unshift(new Fish(link, {
  //       // usingCurve: Math.random() < .5,
  //       // usingCurve: true,
  //       listScope: 'fishs',
  //       points: [
  //         {x: x1, y: y1},
  //         {x: d.w / 2, y: d.h / 2},
  //         {x: x3, y: y3},
  //       ],
  //       v: rand(500, 1000) / 500,
  //     }))
  //   }
  // }, 200)

  // me.render()
})

const d = me.d
const canvas = d.canvas
const gd = d.gd
