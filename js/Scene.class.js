class Scene {
  constructor(d = {}, ready) {
    const me = this

    d.edgeR = 500
    d.countFrame = 0
    d.score = 0
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

    return Promise.all(Object.values(pList).map((val) => {
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

      // d.edgeR = Math.sqrt(w * w + h * h) / 2
      // d.edgeR = Math.max(d.w, d.h) / 2
      d.edgeR = Math.min(d.w, d.h) / 3
      canvas.width = w
      canvas.height = h

      {
        const maxWidth = 1000
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
        const space = cannonWidth / (d.cannons.length + 1)

        d.cannons.forEach((v, idx) => {
          const el = v.d.el

          v.d.x = lrSpace + bottomWidth + (idx + 1) * space
          v.d.y = d.h - el.height / 2
        })
      }
    }
    window.onresize()

    const handleStart = me.handleStart = (e) => {
      // 调整 cannon rotation
      handleMove(e)

      const x4 = d.mouse.x = e.clientX || e.touches?.[0]?.clientX
      const y4 = d.mouse.y = e.clientY || e.touches?.[0]?.clientY

      const bullets = d.cannons.map((cannon) => {
        const d = cannon.d
        const el = d.el
        const linkBullet = 'bullet' + d.link.match(/\d+$/)[0]
        const x1 = d.x + Math.cos(d2a(a2d(d.rotation) - 90)) * el.height / 2
        const y1 = d.y + Math.sin(d2a(a2d(d.rotation) - 90)) * el.height / 2

        d.curFrame = 0

        return new Bullet(linkBullet, {
          // usingCurve: true,
          listScope: 'bullets',
          x1, y1,
          x4, y4,
        })
      })

      d.bullets = d.bullets.concat(bullets)
    }

    const handleMove = me.handleMove = (e) => {
      const x1 = d.mouse.x = e.clientX || e.touches?.[0]?.clientX
      const y1 = d.mouse.y = e.clientY || e.touches?.[0]?.clientY

      d.cannons.forEach((v) => {
        const x2 = v.d.x
        const y2 = v.d.y

        v.d.rotation = d2a(a2d(Math.atan2(y2 - y1, x2 - x1)) - 90)
      })
    }

    handleMove({
      clientX: d.w / 2,
      clientY: d.h / 2,
    })
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
    const listObj = [d.fishs, d.coins, d.nets, d.bottom, d.cannons, d.bullets].flat()

    // document.title = d.fishs.length
    gd.clearRect(0, 0, canvas.width, canvas.height)

    gd.save()

    // gd.beginPath()
    // gd.arc(d.w / 2, d.h / 2, d.edgeR, 0, 2 * Math.PI)
    // gd.fillStyle = 'rgba(255,0,0,.2)'
    // gd.fill()
    
    ;[d.fishs, d.bullets].forEach((row) => {
      row.forEach((v) => {
        const d = v.d
        const el = d.el

        if (d.usingCurve) {
          gd.save()
          gd.beginPath()

          if (d.isBullet) {
            const [
              {x: x1, y: y1},
              {x: x2, y: y2},
              {x: x3, y: y3},
              {x: x4, y: y4},
            ] = d.points

            gd.moveTo(x1, y1)
            gd.bezierCurveTo(
              x2, y2,
              x3, y3,
              x4, y4,
            )
            gd.strokeStyle = 'rgba(255,0,0,.5)'
            gd.stroke()
          } else if (d.isFish) {
            const [
              {x: x1, y: y1},
              {x: x2, y: y2},
              {x: x3, y: y3},
            ] = d.points

            gd.moveTo(x1, y1)
            gd.quadraticCurveTo(
              x2, y2,
              x3, y3,
            )
            gd.strokeStyle = 'rgba(0,255,0,.5)'
            gd.stroke()
          } else {

          }

          gd.restore()
        }
      })
    })

    gd.font = 'bold 16px Arial'
    gd.textAlign = 'center'
    gd.textBaseline = 'middle'

    for (let i = 0; i < listObj.length; i++) {
      const v = listObj[i]
      const d = v.d
      const el = d.el

      v.nextFrame(me)

      gd.save()
      gd.translate(d.x, d.y)
      d.rotation && gd.rotate(d.rotation)
      d.scale && gd.scale(d.scale[0], d.scale[1])
      // gd.beginPath()
      // gd.fillStyle = 'rgba(255,0,0,.3)'
      // gd.fillRect(-el.width / 2, -el.height / 2, el.width - 1, el.height)

      gd.beginPath()

      if (el.frameAlive) {
        gd.rect(
          -el.rec.width / 2 + el.rec.x,
          -el.rec.height / 2 + el.rec.y/* - ((el.height - el.rec.height) / 2)*/,
          el.rec.width,
          el.rec.height,
        )
        // gd.fillStyle = 'rgba(0,255,0,.5)'
        // gd.fill()

        for (let j = 0; j  < me.d.bullets.length; j++) {
          const bullet = me.d.bullets[j]

          if (v.d.isAlive && gd.isPointInPath(bullet.d.x, bullet.d.y)) {
            bullet.attack(me, v)
            me.d.bullets.remove(bullet)
            j--

            if (!v.isAlive) i--
          }
        }

        gd.beginPath()
        gd.drawImage(
          el.img,
          el.x, d.curFrame * el.height, el.width, el.height,
          -el.width / 2, -el.height / 2, el.width, el.height,
        )

        // gd.save()
        // gd.translate(el.width / 2, 0)
        // gd.rotate(d2a(90))
        // gd.fillStyle = 'red'
        // gd.fillText(d.blood + '-' + d.el.reward, -10, 0)
        // gd.restore()
      } else if (d.isCannon) {
        gd.drawImage(
          el.img,
          el.x, (d.curFrame < 5 ? d.curFrame : 0) * el.height, el.width, el.height,
          -el.width / 2, -el.height / 2, el.width, el.height,
        )
      } else {
        gd.drawImage(
          el.img,
          el.x, el.y, el.width, el.height,
          -el.width / 2, -el.height / 2, el.width, el.height,
        )
      }
      gd.restore()
    }

    // 绘制分数
    {
      const el = pList.numberBlack
      const translateX = d.bottom[0].d.x - d.bottom[0].d.el.width / 2 + 24

      gd.save()
      gd.translate(translateX, d.h - 14)

      d.score.toString().padStart(11, 0).split('').forEach((n, idx) => {
        gd.drawImage(
          el.img,
          0, (9 - n) * el.height, el.width, el.height,
          -el.width / 2 + idx * (el.width + 3), -el.height / 2,
          el.width, el.height,
        )
      })
      gd.restore()
    }

    gd.restore()
  }
}
