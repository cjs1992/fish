const fs = require('fs')
const arr = [
  'Bullet.class.js',
  'Cannon.class.js',
  'Fish.class.js',
  'NumBlack.class.js',
  'Shark.class.js',
]

arr.forEach((name) => {
  fs.writeFileSync(name, `
class ${name.substring(0, name.indexOf('.'))} extends Sprite {
  constructor(link, d = {}) {
    super(...arguments)
  }
  nextFrame() {
    const me = this
    const d = me.d
  }
}
  `.trim())
})