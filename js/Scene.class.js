class Scene {
  constructor(d = {}) {
    const me = this
    
    Object.assign(me, d)

    me.fps = 60
    me.score = 0
    me.timeFps = 0
    me.countFrame = 0
    me.mouse = {
      x: 0,
      y: 0,
    }
    me.bottoms = [
      {link: 'bottom', el: pList['bottom'], scale: [1, 1]},
      {link: 'bottom', el: pList['bottom'], scale: [-1, 1]},
    ]
    me.fishs = []
    me.bullets = []
    me.coins = []
    me.coinTexts = []
    me.nets = []

    me.gd = me.canvas.getContext('2d')
  }
  async init() {
    const me = this
    await me.loadRes()
    await me.initEvents()
    await me.loopRender()
    return me
  }
  async loadRes() {
    return await Promise.all(Object.values(pList).map((el) => {
      return new Promise((next) => {
        const img = el.img = new Image()
        img.onload = next
        img.src = el.src
      })
    }))
  }
  initEvents() {
    const me = this
    const {canvas, gd} = me

    window.onresize = () => {
      const w = me.w = canvas.offsetWidth
      const h = me.h = canvas.offsetHeight

      canvas.width = w
      canvas.height = h

      {
        const maxWidth = Math.min (me.w, 1000)
        const mainSpace = (w - maxWidth) / 2
        const [b1, b2] = me.bottoms
        const subSpace = (maxWidth - b1.el.width * 2) / (me.cannons.length + 1)

        b1.x = mainSpace + b1.el.width / 2
        b2.x = b1.x + b1.el.width
        b1.y = b2.y = h - b1.el.height / 2

        me.cannons.forEach((v, idx) => {
          v.x = b2.x + b2.el.width / 2 + subSpace * (idx + 1)
          v.y = h - v.el.height / 2
        })
      }
    }
    window.onresize()

    canvas.onmousedown = canvas.ontouchstart = (e) => {
      me.isMouseDown = e.type === 'mousedown'
      canvas.onmousemove(e)

      const emit = () => {
        if (!me.isMouseDown && me.fps < 50) {
          console.log('out... fps low')
          return
        }

        const x4 = me.mouse.x
        const y4 = me.mouse.y
        const bullets = me.cannons.map((v) => {
          const link = v.link.replace('cannon', 'bullet')
          const x1 = v.x
          const y1 = v.y

          v.curFrame = 0

          return new Bullet({
            link,
            v: 10,
            x1, y1,
            x4, y4,
          })
        })

        me.bullets = me.bullets.concat(bullets)
      }
      emit()
      clearInterval(me.timerEmit)
      me.timerEmit = setInterval(emit, 150)

      document.onmousemove = (e) => {
        canvas.onmousemove(e)
      }

      document.onmouseup = canvas.ontouchend =  (e) => {
        me.isMouseDown = false
        clearInterval(me.timerEmit)
        document.onmousemove = null
        document.onmouseup = null
      }

      return false
    }

    canvas.onmousemove = canvas.ontouchmove = (e) => {
      const x1 = me.mouse.x = e.clientX ?? e.touches?.[0]?.clientX
      const y1 = me.mouse.y = e.clientY ?? e.touches?.[0]?.clientY

      me.cannons.forEach((v) => {
        const {x: x2, y: y2} = v
        v.rotation = d2a(a2d(Math.atan2(y2 - y1, x2 - x1)) - 90)
      })

      return false
    }

    canvas.onmousemove({
      clientX: me.w / 2,
      clientY: me.h / 1.3,
    })
  }
  loopRender() {
    const me = this
    const loopRender = () => {
      me.timerAni = requestAnimationFrame(() => {
        ++me.countFrame

        ;[me.fishs, me.bullets, me.nets, me.coins, me.coinTexts, me.cannons].flat().forEach((v) => {
          v.nextFrame(me)
        })

        me.render()
        loopRender()
      })
    }
    cancelAnimationFrame(me.timerAni)
    loopRender()
  }
  render() {
    const me = this
    const {canvas, gd} = me
    const els = [me.fishs, me.bullets, me.nets, me.coins, me.coinTexts, me.cannons, me.bottoms].flat()

    me.fps = Math.ceil(1000 / (Date.now() - me.timeFps))
    me.timeFps = Date.now()

    gd.font = '18px Arial'
    gd.textAlign = 'center'
    gd.textBaseline = 'middle'

    gd.clearRect(0, 0, me.w, me.h)
    gd.save()

    for (let i = 0; i < els.length; i++) {
      const v = els[i]
      const el = v.el

      gd.save()
      gd.translate(v.x, v.y)
      v.rotation && gd.rotate(v.rotation)
      v.scale && gd.scale(v.scale[0], v.scale[1])
      gd.beginPath()

      if (v.isFish) {
        const half = el.totalFrame / 2

        gd.drawImage(
          el.img,
          el.x, (v.isDie ? half + v.curFrame % half : v.curFrame % half) * el.height, el.width, el.height,
          -el.width / 2, -el.height / 2, el.width, el.height,
        )

        gd.beginPath()
        gd.rect(
          el.rec.x - el.rec.width / 2,
          el.rec.y - el.rec.height / 2,
          el.rec.width,
          el.rec.height,
        )
        // gd.fillStyle = 'rgba(255,170,0,.5)'
        // gd.fill()

        me.bullets.forEach((bullet) => {
          if (!v.isDie && gd.isPointInPath(bullet.x, bullet.y)) {
            bullet.attack(v, me)
          }
        })

        // gd.save()
        // gd.translate(el.width / 2, -10)
        // gd.rotate(d2a(90))
        // gd.fillStyle = 'red'
        // gd.fillText(v.blood + ' - ' + v.el.reward, 0, 0)
        // gd.restore()
      } else if (v.isCannon) {
        gd.drawImage(
          el.img,
          el.x, (v.curFrame < 5 ? v.curFrame : 0) * el.height, el.width, el.height,
          -el.width / 2, -el.height / 2, el.width, el.height,
        )
      } else if (v.isCoin) {
        gd.drawImage(
          el.img,
          el.x, (v.curFrame % 10) * el.height, el.width, el.height,
          -el.width / 2, -el.height / 2, el.width, el.height,
        )
      } else if (v.isCoinText) {
        const str = v.reward
        const width = str.length * el.width

        for (let j = 0; j < str.length; j++) {
          const s = str[j]

          gd.drawImage(
            el.img,
            (s === 'x' ? 10 : s) * el.width, 0, el.width, el.height,
            j * el.width - width / 2, -el.height / 2, el.width, el.height,
          )
        }
      } else {
        gd.drawImage(
          el.img,
          el.x, el.y, el.width, el.height,
          -el.width / 2, -el.height / 2, el.width, el.height,
        )
      }
      gd.restore()
    }

    {
      const str = me.score.toString().padStart(11, 0)
      const btm = me.bottoms[0]
      const el = pList['numberBlack']

      gd.save()
      gd.translate(btm.x - btm.el.width / 2, btm.y)

      for (let i = 0; i < str.length; i++) {
        const n = 9 - str[i]

        gd.beginPath()
        gd.drawImage(
          el.img,
          0, n * el.height, el.width, el.height,
          -el.width / 2 + 24 + i * 23, el.height - 15, el.width, el.height,
        )
      }
      gd.restore()
    }

    gd.restore()
  }
}
