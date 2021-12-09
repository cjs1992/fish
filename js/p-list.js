const pList = {
  "bottom": {
    "src": "./img/bottom.png",
    "x": 5, "y": 0, "width": 138, "height": 70,
  },
  "bullet1": {
    "src": "./img/bullet.png",
    "x": 0, "y": 0, "width": 23, "height": 26,
    "hurt": Math.pow(2, 1 - 1),
  },
  "bullet2": {
    "src": "./img/bullet.png",
    "x": 0, "y": 50, "width": 25, "height": 29,
    "hurt": Math.pow(2, 2 - 1),
  },
  "bullet3": {
    "src": "./img/bullet.png",
    "x": 0, "y": 100, "width": 26, "height": 31,
    "hurt": Math.pow(2, 3 - 1),
  },
  "bullet4": {
    "src": "./img/bullet.png",
    "x": 0, "y": 150, "width": 27, "height": 33,
    "hurt": Math.pow(2, 4 - 1),
  },
  "bullet5": {
    "src": "./img/bullet.png",
    "x": 0, "y": 200, "width": 29, "height": 34,
    "hurt": Math.pow(2, 5 - 1),
  },
  "bullet6": {
    "src": "./img/bullet.png",
    "x": 0, "y": 250, "width": 30, "height": 35,
    "hurt": Math.pow(2, 6 - 1),
  },
  "bullet7": {
    "src": "./img/bullet.png",
    "x": 0, "y": 300, "width": 28, "height": 44,
    "hurt": Math.pow(2, 7 - 1),
  },
  "cannon1": {
    "src": "./img/cannon1.png",
    "x": 0, "y": 0, "width": 74, "height": 74,
  },
  "cannon2": {
    "src": "./img/cannon2.png",
    "x": 0, "y": 0, "width": 74, "height": 76,
  },
  "cannon3": {
    "src": "./img/cannon3.png",
    "x": 0, "y": 0, "width": 74, "height": 76,
  },
  "cannon4": {
    "src": "./img/cannon4.png",
    "x": 0, "y": 0, "width": 74, "height": 83,
  },
  "cannon5": {
    "src": "./img/cannon5.png",
    "x": 0, "y": 0, "width": 74, "height": 85,
  },
  "cannon6": {
    "src": "./img/cannon6.png",
    "x": 0, "y": 0, "width": 74, "height": 90,
  },
  "cannon7": {
    "src": "./img/cannon7.png",
    "x": 0, "y": 0, "width": 74, "height": 94,
  },
  "fish1": {
    "src": "./img/fish1.png",
    "x": 0, "y": 0, "width": 55, "height": 37,
    "blood": Math.pow(2, 1),
    "frameAlive": [0, 3],
    "frameDie": [4, 7],
    "totalFrame": 8,
    "rec": {"x": 10, "y": -7, "width": 30, "height": 20},
  },
  "fish2": {
    "src": "./img/fish2.png",
    "x": 0, "y": 0, "width": 78, "height": 64,
    "blood": Math.pow(2, 2),
    "frameAlive": [0, 3],
    "frameDie": [4, 7],
    "totalFrame": 8,
    "rec": {"x": 15, "y": -11, "width": 40, "height": 30},
  },
  "fish3": {
    "src": "./img/fish3.png",
    "x": 0, "y": 0, "width": 72, "height": 56,
    "blood": Math.pow(2, 3),
    "frameAlive": [0, 3],
    "frameDie": [4, 7],
    "totalFrame": 8,
    "rec": {"x": 12, "y": -10, "width": 40, "height": 30},
  },
  "fish4": {
    "src": "./img/fish4.png",
    "x": 0, "y": 0, "width": 77, "height": 59,
    "blood": Math.pow(2, 4),
    "frameAlive": [0, 3],
    "frameDie": [4, 7],
    "totalFrame": 8,
    "rec": {"x": 10, "y": -15, "width": 45, "height": 30},
  },
  "fish5": {
    "src": "./img/fish5.png",
    "x": 0, "y": 0, "width": 107, "height": 122,
    "blood": Math.pow(2, 5),
    "frameAlive": [0, 3],
    "frameDie": [4, 7],
    "totalFrame": 8,
    "rec": {"x": 14, "y": -10, "width": 60, "height": 45},
  },
  "fish6": {
    "src": "./img/fish6.png",
    "x": 0, "y": 0, "width": 105, "height": 79,
    "blood": Math.pow(2, 6),
    "frameAlive": [0, 5],
    "frameDie": [6, 11],
    "totalFrame": 12,
    "rec": {"x": 15, "y": -10, "width": 60, "height": 60},
  },
  "fish7": {
    "src": "./img/fish7.png",
    "x": 0, "y": 0, "width": 92, "height": 151,
    "blood": Math.pow(2, 7),
    "frameAlive": [0, 4],
    "frameDie": [5, 9],
    "totalFrame": 10,
    "rec": {"x": 5, "y": -35, "width": 65, "height": 70},
  },
  "fish8": {
    "src": "./img/fish8.png",
    "x": 0, "y": 0, "width": 174, "height": 126,
    "blood": Math.pow(2, 8),
    "frameAlive": [0, 5],
    "frameDie": [6, 11],
    "totalFrame": 12,
    "rec": {"x": -10, "y": -17, "width": 80, "height": 50},
  },
  "fish9": {
    "src": "./img/fish9.png",
    "x": 0, "y": 0, "width": 166, "height": 183,
    "blood": Math.pow(2, 9),
    "frameAlive": [0, 5],
    "frameDie": [6, 11],
    "totalFrame": 12,
    "rec": {"x": 27, "y": -15, "width": 80, "height": 80},
  },
  "fish10": {
    "src": "./img/fish10.png",
    "x": 0, "y": 0, "width": 178, "height": 187,
    "blood": Math.pow(2, 10),
    "frameAlive": [0, 4],
    "frameDie": [5, 9],
    "totalFrame": 10,
    "rec": {"x": -12, "y": -20, "width": 100, "height": 90},
  },
  "fish11": {
    "src": "./img/fish11.png",
    "x": 0, "y": 0, "width": 509, "height": 270,
    "blood": Math.pow(2, 11),
    "frameAlive": [0, 5],
    "frameDie": [6, 11],
    "totalFrame": 12,
    "rec": {"x": 75, "y": -8, "width": 350, "height": 70},
  },
  "fish12": {
    "src": "./img/fish12.png",
    "x": 0, "y": 0, "width": 516, "height": 273,
    "blood": Math.pow(2, 12),
    "frameAlive": [0, 5],
    "frameDie": [6, 11],
    "totalFrame": 12,
    "rec": {"x": 70, "y": -8, "width": 350, "height": 70},
  },
  "net1": {
    "src": "./img/net.png",
    "x": 0, "y": 0, "width": 90, "height": 90,
  },
  "net2": {
    "src": "./img/net.png",
    "x": 0, "y": 200, "width": 110, "height": 110,
  },
  "net3": {
    "src": "./img/net.png",
    "x": 0, "y": 400, "width": 128, "height": 128,
  },
  "net4": {
    "src": "./img/net.png",
    "x": 0, "y": 600, "width": 150, "height": 150,
  },
  "net5": {
    "src": "./img/net.png",
    "x": 0, "y": 800, "width": 163, "height": 163,
  },
  "net6": {
    "src": "./img/net.png",
    "x": 0, "y": 1000, "width": 182, "height": 182,
  },
  "net7": {
    "src": "./img/net.png",
    "x": 0, "y": 1200, "width": 200, "height": 200,
  },
  "coin1": {
    "src": "./img/coinAni1.png",
    "x": 0, "y": 0, "width": 60, "height": 60,
  },
  "coin2": {
    "src": "./img/coinAni2.png",
    "x": 0, "y": 0, "width": 60, "height": 60,
  },
  "coinText": {
    "src": "./img/coinText.png",
    "x": 0, "y": 0, "width": 36, "height": 49,
  },
  "numberBlack": {
    "src": "./img/number_black.png",
    "x": 0, "y": 0, "width": 20, "height": 24,
  }
}