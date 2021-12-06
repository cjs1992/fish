class Game {
  constructor(d = {}, ready) {
    const me = this

    d.svgNS = 'http://www.w3.org/2000/svg'
    d.countFrame = 0
    d.gd = d.canvas.getContext('2d')
    d.mouse = {
      x: 0,
      y: 0,
    }

    d.bottom = [
      new Sprite('bottom'),
      new Sprite('bottom', {scale: [-1, 1]}),
    ]
    d.bullets = []
    d.coins = []
    d.fishs = []
    d.nets = []

    me.d = d
    me.ready = ready
    me.init()
  }
  async init() {
    const me = this
    const d = me.d
    const canvas = d.canvas
    const gd = d.gd

    await me.loadRes()
    await me.initEvents()
    await me.loopRender()
    me.ready && await me.ready(this, d)
    delete me.ready
  }
  async loadRes() {
    const me = this
    const d = me.d

    return Promise.all(Object.values(d.pList).map((val) => {
      return new Promise((next) => {
        const img = val.img = new Image()
        img.onload = next
        img.src = val.src
      })
    }))
  }
  async initEvents() {
    const me = this
    const d = me.d
    const canvas = d.canvas
    const gd = d.gd

    window.onresize = () => {
      const w = d.w = canvas.offsetWidth
      const h = d.h = canvas.offsetHeight

      canvas.width = w
      canvas.height = h

      {
        const maxWidth = 1500
        let lrSpace = d.w - maxWidth
        lrSpace = (lrSpace < 0 ? 0 : lrSpace) / 2
        const w = Math.min(maxWidth, d.w)
        const bottomWidth = pList.bottom.width * 2
        const mainSpace = w - bottomWidth

        const bl = d.bottom[0]
        const br = d.bottom[1]

        bl.d.x = lrSpace + pList.bottom.width / 2
        bl.d.y = d.h - pList.bottom.height / 2

        br.d.x = bl.d.x + pList.bottom.width
        br.d.y = bl.d.y

        const cannonWidth = w - bottomWidth
        const space = cannonWidth / (d.cannon.length + 1)

        d.cannon.forEach((v, idx) => {
          const el = pList[v.d.link]

          v.d.x = lrSpace + bottomWidth + (idx + 1) * space
          v.d.y = d.h - el.height / 2
        })
      }
    }
    window.onresize()


    const handleStart = (e) => {
      const x4 = e.clientX || e.touches?.[0]?.clientX
      const y4 = e.clientY || e.touches?.[0]?.clientY

      const bullets = d.cannon.map((cannon) => {
        const x1 = cannon.d.x
        const y1 = cannon.d.y

        const x2 = x1
        const y2 = (y1 + y4) / 2

        const x3 = x4
        const y3 = (y1 + y4) / 2

        const points = [
          {x: x1, y: y1},
          {x: x2, y: y2},
          {x: x3, y: y3},
          {x: x4, y: y4},
        ]
        const g = document.createElementNS(d.svgNS, 'g')

        g.innerHTML = `
          <path
            d="M ${x1} ${y1} C ${x2} ${y2}, ${x3} ${y3}, ${x4} ${y4}"
            fill="transparent"
            stroke-width="2"
            stroke="wheat"
          ></path>
        `.trim()

        const path = g.children[0]

        // d.svg.appendChild(path)

        return new Bullet('bullet' + cannon.d.link.match(/\d+$/)[0], {
          path,
          totalLength: path.getTotalLength(),
          points,
          timeStart: Date.now(),
          duration: 2000,
          x: cannon.d.x,
          y: cannon.d.y,
        })
      })

      d.bullets = d.bullets.concat(bullets)
    }

    const handleMove = (e) => {
      const x1 = d.mouse.x = e.clientX || e.touches?.[0]?.clientX
      const y1 = d.mouse.y = e.clientY || e.touches?.[0]?.clientY

      d.cannon.forEach((v) => {
        const x2 = v.d.x
        const y2 = v.d.y

        v.d.angle = d2a(a2d(Math.atan2(y2 - y1, x2 - x1)) - 90)
      })
    }

    canvas.addEventListener('mousedown', handleStart, {passive: false})
    canvas.addEventListener('touchstart', handleStart, {passive: false})

    canvas.addEventListener('mousemove', handleMove, {passive: false})
    canvas.addEventListener('touchmove', handleMove, {passive: false})
  }
  async loopRender() {
    const me = this
    const d = me.d
    const loopRender = () => {
      d.timerAni = requestAnimationFrame(() => {
        ++d.countFrame

        ;[d.fishs, d.bullets, d.coins, d.nets, d.bottom, d.cannon].forEach((row) => {
          row.forEach((v) => {
            v.nextFrame(me, d.countFrame)
          })
        })

        me.render()
        loopRender()
      }, 300)
    }
    loopRender()
  }
  async render() {
    // console.log('render')
    const me = this
    const d = me.d
    const canvas = d.canvas
    const gd = d.gd

    gd.clearRect(0, 0, canvas.width, canvas.height)

    // gd.fillStyle = 'rgba(0,170,255,.1)'
    // gd.fillRect((d.w - 1000) / 2, d.h - 100, 1000, 100)

    gd.save()
    ;[d.fishs, d.coins, d.nets, d.bottom, d.bullets, d.cannon].forEach((row) => {
      row.forEach((v) => {
        const d = v.d
        const el = pList[d.link]

        if (d.path) {
          // gd.save()

          // const [
          //   {x: x1, y: y1},
          //   {x: x2, y: y2},
          //   {x: x3, y: y3},
          //   {x: x4, y: y4},
          // ] = d.points

          // gd.beginPath()
          // gd.moveTo(x1, y1)
          // gd.bezierCurveTo(
          //   x2, y2,
          //   x3, y3,
          //   x4, y4,
          // )
          // gd.strokeStyle = 'rgba(255,0,0,.5)'
          // gd.stroke()

          // gd.restore()
        }
        
        gd.save()
        gd.translate(d.x, d.y)
        d.angle && gd.rotate(d.angle)
        d.scale && gd.scale(d.scale[0], d.scale[1])
        // gd.fillStyle = 'rgba(255,0,0,.1)'
        // gd.fillRect(-el.width / 2, -el.height / 2, el.width, el.height)
        gd.drawImage(
          el.img,
          el.x, el.y, el.width, el.height,
          -el.width / 2, -el.height / 2, el.width, el.height,
        )
        gd.restore()

      })
    })
    gd.restore()
  }
}
