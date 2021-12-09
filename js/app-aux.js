function sleep(time) {
  return time && new Promise((next) => {
    setTimeout(next, time)
  })
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function d2a(deg) {
  return deg / 180 * Math.PI
}

function a2d(rotation) {
  return rotation * 180 / Math.PI
}

Array.prototype.first = function() {
  return this[0]
}

Array.prototype.last = function() {
  return this[this.length - 1]
}

Array.prototype.swap = function(a, b) {
  const t = this[a]
  this[a] = this[b]
  this[b] = t
  return this
}

Array.prototype.shuffle = function() {
  for (let i = this.length - 1; i > 0; i--) {
    this.swap(i, Math.floor(Math.random() * (i + 1)))
  }
  return this
}

Array.prototype.remove = function(v) {
  for (let i = 0; i < this.length; i++) {
    if (this[i] === v) {
      this.splice(i, 1)
      i--
    }
  }

  return this
}