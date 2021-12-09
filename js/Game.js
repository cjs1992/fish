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

  setInterval(() => {
    if (d.fishs.length > 500) return

    for (let j = 0; j < 20; j++) {
      let type = rand(1, 4096)

      for (let i = 11; i > -1; i--) {
        if (type >= Math.pow(2, i)) {
          type = 12 - i
          break
        }
      }

      const link = 'fish' + type
      const el = pList[link]

      let deg1 = rand(0, 3600) / 10
      let deg2 = rand(0, 3600) / 10

      // while (Math.abs(deg2 - deg1) < 15) {
      //   deg2 = rand(0, 3600) / 10
      // }

      const angle1 = d2a(deg1)
      const angle3 = d2a(deg2)

      const x1 = Math.cos(angle1) * d.edgeR + d.w / 2
      const y1 = Math.sin(angle1) * d.edgeR + d.h / 2

      const x3 = Math.cos(angle3) * d.edgeR + d.w / 2
      const y3 = Math.sin(angle3) * d.edgeR + d.h / 2

      d.fishs.unshift(new Fish(link, {
        // usingCurve: Math.random() < .5,
        // usingCurve: true,
        listScope: 'fishs',
        points: [
          {x: x1, y: y1},
          {x: d.w / 2, y: d.h / 2},
          {x: x3, y: y3},
        ],
        v: rand(500, 1000) / 500,
      }))
    }
  }, 200)

  me.render()
})

const d = me.d
const canvas = d.canvas
const gd = d.gd
