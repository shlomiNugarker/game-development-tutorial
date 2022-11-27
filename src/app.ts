// // // // Project 1: Vanilla JavaScript sprite animation techniques:

let playerState = 'sit'
const dropdown = document.getElementById('animations')
dropdown?.addEventListener('change', (ev) => {
  if (ev.target instanceof HTMLSelectElement) {
    playerState = ev.target.value
  }
})

const canvas = <HTMLCanvasElement>document.getElementById('canvas1')
const ctx = canvas.getContext('2d')!

const CANVAS_WIDTH = (canvas.width = 600)
const CANVAS_HEIGHT = (canvas.height = 600)

const playerImage = new Image()
playerImage.src = '../src/assets/shadow_dog.png'
const spriteWidth = 575
const spriteHeight = 523

// let frameX = 0
// let frameY = 4
let gameFrame = 0
const staggerFrames = 5

const spriteAnimation: any = []

const animationStates = [
  {
    name: 'idle',
    frames: 7,
  },
  {
    name: 'jump',
    frames: 7,
  },
  {
    name: 'fall',
    frames: 9,
  },
  {
    name: 'run',
    frames: 9,
  },
  {
    name: 'dizzy',
    frames: 11,
  },
  {
    name: 'sit',
    frames: 5,
  },
  {
    name: 'roll',
    frames: 7,
  },
  {
    name: 'bite',
    frames: 7,
  },
  {
    name: 'ko',
    frames: 7,
  },
  {
    name: 'getHit',
    frames: 4,
  },
]

animationStates.forEach((state, idx) => {
  let frames: { loc: { x: number; y: number }[] } = {
    loc: [],
  }

  for (let j = 0; j < state.frames; j++) {
    let positionX = j * spriteWidth
    let positionY = idx * spriteHeight
    frames.loc.push({ x: positionX, y: positionY })
  }

  spriteAnimation[state.name] = frames
})

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  let position =
    Math.floor(gameFrame / staggerFrames) %
    spriteAnimation[playerState].loc.length
  let frameX = spriteWidth * position
  let frameY = spriteAnimation[playerState].loc[position].y
  //   ctx.drawImage(image,sx,sy,sw,sh,dx,dy,dw,dh) // Reference
  ctx.drawImage(
    playerImage,
    frameX,
    frameY,
    spriteWidth,
    spriteHeight,
    0,
    0,
    spriteWidth,
    spriteHeight
  )

  if (gameFrame % staggerFrames === 0) {
    if (frameX < 6) frameX++
    else frameX = 0
  }

  gameFrame++
  requestAnimationFrame(animate)
}
animate()

// // // // // *****************************************************************************
// // // // //  Project 2: Parallax backgrounds with JavaScript

const canvas2 = <HTMLCanvasElement>document.getElementById('canvas2')
const ctx2 = canvas2.getContext('2d')!
const CANVAS_WIDTH2 = (canvas2.width = 800)
const CANVAS_HEIGHT2 = (canvas2.height = 700)
let gameSpeed = 10
// let gameFrame = 0

const backgroundLayer1 = new Image()
backgroundLayer1.src = '../src/assets/backgroundlayers/layer-1.png'
const backgroundLayer2 = new Image()
backgroundLayer2.src = '../src/assets/backgroundlayers/layer-2.png'
const backgroundLayer3 = new Image()
backgroundLayer3.src = '../src/assets/backgroundlayers/layer-3.png'
const backgroundLayer4 = new Image()
backgroundLayer4.src = '../src/assets/backgroundlayers/layer-4.png'
const backgroundLayer5 = new Image()
backgroundLayer5.src = '../src/assets/backgroundlayers/layer-5.png'

class Layer {
  x: number
  y: number
  width: number
  height: number
  //   x2: number
  image: HTMLImageElement
  speedModifier: number
  speed: number
  constructor(image: HTMLImageElement, speedModifier: number) {
    this.x = 0
    this.y = 0
    this.width = 2400
    this.height = 700
    // this.x2 = this.width
    this.image = image
    this.speedModifier = speedModifier
    this.speed = gameSpeed * this.speedModifier
  }
  update() {
    this.speed = gameSpeed * this.speedModifier
    if (this.x <= -this.width) {
      this.x = 0
    }
    this.x = this.x - this.speed
    // this.x = (gameFrame * this.speed) % this.width
  }
  draw() {
    ctx2.drawImage(this.image, this.x, this.y, this.width, this.height)
    ctx2.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    )
  }
}

const layer1 = new Layer(backgroundLayer1, 0.2)
const layer2 = new Layer(backgroundLayer2, 0.4)
const layer3 = new Layer(backgroundLayer3, 0.6)
const layer4 = new Layer(backgroundLayer4, 0.8)
const layer5 = new Layer(backgroundLayer5, 1)

const gameObject = [layer1, layer2, layer3, layer4, layer5]

function animate2() {
  ctx2.clearRect(0, 0, CANVAS_WIDTH2, CANVAS_HEIGHT2)
  gameObject.forEach((obj) => {
    obj.update()
    obj.draw()
  })
  requestAnimationFrame(animate2)
  //   gameFrame--
}

animate2()

// // // // *************************************************************************

// // // //  Project 3: Enemy movement patterns

const canvas3 = <HTMLCanvasElement>document.getElementById('canvas3')
const ctx3 = canvas3.getContext('2d')!
const CANVAS_WIDTH3 = (canvas3.width = 500)
const CANVAS_HEIGHT3 = (canvas3.height = 1000)
const numberOfEnemies3 = 10
const enemiesArray3: Enemy[] = []
const enemyImage3 = new Image()
enemyImage3.src = '../src/assets/enemies/enemy1.png'
let gameFrame3 = 0

class Enemy {
  x: number
  y: number
  width: number
  height: number
  //   speed: number
  spriteWidth: number
  spriteHeight: number
  frame: number
  flapSpeed: number
  image: HTMLImageElement
  constructor() {
    this.image = new Image()
    this.image.src = '../src/assets/enemies/enemy1.png'

    // this.speed = Math.random() * 4 - 2
    this.spriteWidth = 293
    this.spriteHeight = 155
    this.width = this.spriteWidth / 2.5
    this.height = this.spriteHeight / 2.5
    this.x = Math.random() * (canvas3.width - this.width)
    this.y = Math.random() * (canvas3.height - this.height)
    this.frame = 0
    this.flapSpeed = Math.floor(Math.random() * 3 + 1)
  }
  update() {
    this.x += Math.random() * 15 - 7.5
    this.y += Math.random() * 15 - 5
    if (gameFrame3 % this.flapSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++
    }
  }
  draw() {
    ctx3.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }
}

for (let i = 0; i < numberOfEnemies3; i++) {
  enemiesArray3.push(new Enemy())
}

function animate3() {
  ctx3.clearRect(0, 0, CANVAS_WIDTH3, CANVAS_HEIGHT3)
  enemiesArray3.forEach((enemy) => {
    enemy.update()
    enemy.draw()
  })
  gameFrame3++
  requestAnimationFrame(animate3)
}
animate3()

// // //  Project 3: Enemy movement patterns ******************  COPY- SECOND MOVEMENT  ******************
const canvas4 = <HTMLCanvasElement>document.getElementById('canvas4')
const ctx4 = canvas4.getContext('2d')!
const CANVAS_WIDTH4 = (canvas4.width = 500)
const CANVAS_HEIGHT4 = (canvas4.height = 1000)
const numberOfEnemies4 = 220
const enemiesArray4: Enemy4[] = []
const enemyImage4 = new Image()
enemyImage4.src = '../src/assets/enemies/enemy1.png'
let gameFrame4 = 0

class Enemy4 {
  x: number
  y: number
  width: number
  height: number
  speed: number
  spriteWidth: number
  spriteHeight: number
  frame: number
  flapSpeed: number
  image: HTMLImageElement
  angle: number
  angleSpeed: number
  curve: number
  constructor() {
    this.image = new Image()
    this.image.src = '../src/assets/enemies/enemy2.png'

    this.speed = Math.random() * 4 + 1
    this.spriteWidth = 266
    this.spriteHeight = 188
    this.width = this.spriteWidth / 2.5
    this.height = this.spriteHeight / 2.5
    this.x = Math.random() * (canvas4.width - this.width)
    this.y = Math.random() * (canvas4.height - this.height)
    this.frame = 0
    this.flapSpeed = Math.floor(Math.random() * 3 + 1)
    this.angle = 0
    this.angleSpeed = Math.random() * 0.2
    this.curve = Math.random() * 7
  }
  update() {
    this.x -= this.speed
    this.y += this.curve * Math.sin(this.angle)
    this.angle += this.angleSpeed
    if (this.x + this.width < 0) this.x = canvas4.width
    if (gameFrame4 % this.flapSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++
    }
  }
  draw() {
    ctx4.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }
}

for (let i = 0; i < numberOfEnemies4; i++) {
  enemiesArray4.push(new Enemy4())
}

function animate4() {
  ctx4.clearRect(0, 0, CANVAS_WIDTH4, CANVAS_HEIGHT4)
  enemiesArray4.forEach((enemy) => {
    enemy.update()
    enemy.draw()
  })
  gameFrame4++
  requestAnimationFrame(animate4)
}
animate4()

// //  Project 3: Enemy movement patterns ******************  COPY- THIRD MOVEMENT  ******************

const canvas5 = <HTMLCanvasElement>document.getElementById('canvas5')
const ctx5 = canvas5.getContext('2d')!
const CANVAS_WIDTH5 = (canvas5.width = 500)
const CANVAS_HEIGHT5 = (canvas5.height = 1000)
const numberOfEnemies5 = 5

const enemiesArray5: Enemy5[] = []
const enemyImage5 = new Image()
enemyImage5.src = '../src/assets/enemies/enemy1.png'
let gameFrame5 = 0

class Enemy5 {
  x: number
  y: number
  width: number
  height: number
  speed: number
  spriteWidth: number
  spriteHeight: number
  frame: number
  flapSpeed: number
  image: HTMLImageElement
  angle: number
  angleSpeed: number
  curve: number
  constructor() {
    this.image = new Image()
    this.image.src = '../src/assets/enemies/enemy3.png'

    this.speed = Math.random() * 4 + 1
    this.spriteWidth = 218
    this.spriteHeight = 177
    this.width = this.spriteWidth / 2
    this.height = this.spriteHeight / 2
    this.x = Math.random() * (canvas5.width - this.width)
    this.y = Math.random() * (canvas5.height - this.height)
    this.frame = 0
    this.flapSpeed = Math.floor(Math.random() * 3 + 1)
    this.angle = Math.random() * 500
    this.angleSpeed = Math.random() * 2 + 0.5
    this.curve = Math.random() * 200 + 50
  }
  update() {
    // this.x -= this.speed
    this.x =
      (canvas5.width / 2) * Math.cos((this.angle * Math.PI) / 190) +
      (canvas5.width / 2 - this.width / 2)
    // this.y += this.curve * Math.sin(this.angle)
    this.y =
      (canvas5.width / 2) * Math.sin((this.angle * Math.PI) / 140) +
      (canvas5.height / 2 - this.height / 2)

    this.angle += this.angleSpeed
    if (this.x + this.width < 0) this.x = canvas5.width
    if (gameFrame5 % this.flapSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++
    }
  }
  draw() {
    ctx5.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }
}

for (let i = 0; i < numberOfEnemies5; i++) {
  enemiesArray5.push(new Enemy5())
}

function animate5() {
  ctx5.clearRect(0, 0, CANVAS_WIDTH5, CANVAS_HEIGHT5)
  enemiesArray5.forEach((enemy) => {
    enemy.update()
    enemy.draw()
  })
  gameFrame5++
  requestAnimationFrame(animate5)
}
animate5()

// //  Project 3: Enemy movement patterns ******************  COPY- FOURTH MOVEMENT  ******************
const canvas6 = <HTMLCanvasElement>document.getElementById('canvas6')
const ctx6 = canvas6.getContext('2d')!
const CANVAS_WIDTH6 = (canvas6.width = 500)
const CANVAS_HEIGHT6 = (canvas6.height = 1000)
const numberOfEnemies6 = 15

const enemiesArray6: Enemy6[] = []
const enemyImage6 = new Image()
enemyImage6.src = '../src/assets/enemies/enemy1.png'
let gameFrame6 = 0

class Enemy6 {
  x: number
  y: number
  width: number
  height: number
  speed: number
  spriteWidth: number
  spriteHeight: number
  frame: number
  flapSpeed: number
  image: HTMLImageElement
  newX: number
  newY: number
  interval: number

  constructor() {
    this.image = new Image()
    this.image.src = '../src/assets/enemies/enemy3.png'

    this.speed = Math.random() * 4 + 1
    this.spriteWidth = 218
    this.spriteHeight = 177
    this.width = this.spriteWidth / 2
    this.height = this.spriteHeight / 2
    this.x = Math.random() * (canvas6.width - this.width)
    this.y = Math.random() * (canvas6.height - this.height)
    this.newX = Math.random() * canvas6.width
    this.newY = Math.random() * canvas6.height
    this.frame = 0
    this.flapSpeed = Math.floor(Math.random() * 3 + 1)
    this.interval = Math.floor(Math.random() * 200 + 50)
  }
  update() {
    if (gameFrame6 % this.interval === 0) {
      this.newX = Math.random() * (canvas6.width - this.width)
      this.newY = Math.random() * (canvas6.height - this.height)
    }
    let dx = this.x - this.newX
    let dy = this.y - this.newY

    this.x -= dx / 20
    this.y -= dy / 20
    if (this.x + this.width < 0) this.x = canvas6.width
    if (gameFrame6 % this.flapSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++
    }
  }
  draw() {
    ctx6.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }
}

for (let i = 0; i < numberOfEnemies6; i++) {
  enemiesArray6.push(new Enemy6())
}

function animate6() {
  ctx6.clearRect(0, 0, CANVAS_WIDTH6, CANVAS_HEIGHT6)
  enemiesArray6.forEach((enemy) => {
    enemy.update()
    enemy.draw()
  })
  gameFrame6++
  requestAnimationFrame(animate6)
}
animate6()

// // **************  Project 4: Collision animations from a sprite sheet **********************************
const canvas7 = <HTMLCanvasElement>document.getElementById('canvas7')
const ctx7 = canvas7.getContext('2d')!
canvas7.width = 500
canvas7.height = 700
const explosions: Explosion[] = []
let canvasPositions = canvas7.getBoundingClientRect()

class Explosion {
  x: number
  y: number
  spriteWidth: number
  spriteHeight: number
  width: number
  height: number
  image: HTMLImageElement
  frame: number
  timer: number
  angle: number
  constructor(x: number, y: number) {
    this.spriteWidth = 200
    this.spriteHeight = 179
    this.width = this.spriteWidth / 0.7
    this.height = this.spriteHeight / 0.7
    this.x = x
    this.y = y
    this.image = new Image()
    this.image.src = '../src/assets/boom.png'
    this.frame = 0
    this.timer = 0
    this.angle = Math.random() * 6.2
  }
  update() {
    this.timer++
    if (this.timer % 10 === 0) {
      this.frame++
    }
  }
  draw() {
    ctx7.save()
    ctx7.translate(this.x, this.y)
    ctx7.rotate(this.angle)
    ctx7.drawImage(
      this.image,
      this.spriteWidth * this.frame,
      0,
      this.spriteWidth,
      this.spriteHeight,
      0 - this.width / 2,
      0 - this.height / 2,
      this.width,
      this.height
    )
    ctx7.restore()
  }
}

// window.addEventListener('click', (ev) => {
//   createAnimation(ev)
// })
// window.addEventListener('mousemove', (ev) => {
//   createAnimation(ev)
// })

function createAnimation(ev: MouseEvent) {
  let posX = ev.x - canvasPositions.left
  let posY = ev.y - canvasPositions.top

  explosions.push(new Explosion(posX, posY))
}

function animate7() {
  ctx7.clearRect(0, 0, canvas7.width, canvas7.height)
  for (let i = 0; i < explosions.length; i++) {
    explosions[i].update()
    explosions[i].draw()
    if (explosions[i].frame > 5) {
      explosions.splice(i, 1)
      i--
    }
  }
  requestAnimationFrame(animate7)
}

animate7()

// // **************  Project 5: Point & shoot game **********************************

const canvas8 = <HTMLCanvasElement>document.getElementById('canvas8')
const ctx8 = canvas8.getContext('2d')!
canvas8.width = 700
canvas8.height = 500

const collosionCanvas = <HTMLCanvasElement>(
  document.getElementById('collosionCanvas')
)
const collosionCtx = canvas8.getContext('2d')!
collosionCanvas.width = 700
collosionCanvas.height = 500

let score = 0
ctx8.font = '50px Impact'

let gameOver = false

let timeToNextRaven = 0
let ravenInterval = 500
let lastTime = 0

let raves: Raven[] = []

class Raven {
  width: number
  height: number
  x: number
  y: number
  directionX: number
  directionY: number
  markedForDeletion: boolean
  image: any
  spriteWidth: number
  spriteHeight: number
  sizeModifier: number
  frame: number
  maxFrame: number
  timeSinceFlap: number
  flapInterval: number
  randomColors: number[]
  color: string
  constructor() {
    this.spriteWidth = 271
    this.spriteHeight = 194
    this.sizeModifier = Math.random() * 0.6 + 0.4
    this.width = this.spriteWidth * this.sizeModifier
    this.height = this.spriteHeight * this.sizeModifier
    this.x = canvas8.width
    this.y = Math.random() * (canvas8.height - this.height)
    this.directionX = Math.random() * 5 + 3
    this.directionY = Math.random() * 5 - 2.5
    this.markedForDeletion = false
    this.image = new Image()
    this.image.src = '../src/assets/raven.png'
    this.frame = 0
    this.maxFrame = 4
    this.timeSinceFlap = 0
    this.flapInterval = 90
    this.randomColors = [
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
    ]
    this.color =
      'rgb(' +
      this.randomColors[0] +
      ',' +
      this.randomColors[1] +
      ',' +
      this.randomColors[2] +
      ')'
  }

  update(deltatime: number) {
    if (this.y < 0 || this.y > canvas8.height - this.height) {
      this.directionY = this.directionY * -1
    }
    this.x -= this.directionX
    this.y += this.directionY
    if (this.x < 0 - this.width) this.markedForDeletion = true
    this.timeSinceFlap += deltatime
    if (this.timeSinceFlap > this.flapInterval) {
      if (this.frame > this.maxFrame) this.frame = 0
      else this.frame++
      this.timeSinceFlap = 0
    }
  }

  draw() {
    collosionCtx.fillStyle = this.color
    collosionCtx.fillRect(this.x, this.y, this.width, this.height)
    ctx8.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }
}

let explosions2: Explosion2[] = []

class Explosion2 {
  image: HTMLImageElement
  spriteWidth: number
  spriteHeight: number
  size: any
  x: any
  y: any
  frame: number
  timeSinceLastFrame: number
  frameInterval: number
  markedForDeletion: boolean
  constructor(x: number, y: number, size: number) {
    this.image = new Image()
    this.image.src = '../src/assets/boom.png'
    this.spriteWidth = 200
    this.spriteHeight = 179
    this.size = size
    this.x = x
    this.y = y
    this.frame = 0
    //  this.sound = new Audio('')
    //  this.sound.src = new Audio('')
    this.timeSinceLastFrame = 0
    this.frameInterval = 200
    this.markedForDeletion = false
  }
  update(deltatime: number) {
    // if(this.frame === 0 ) this.sound.play()
    this.timeSinceLastFrame += deltatime
    if (this.timeSinceLastFrame > this.frameInterval) {
      this.frame++
      this.timeSinceLastFrame = 0
      if (this.frame > 5) this.markedForDeletion = true
    }
  }
  draw() {
    ctx8.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y - this.size / 4,
      this.size,
      this.size
    )
  }
}

let particles: Particle[] = []

class Particle {
  x: number
  y: number
  radius: number
  markedForDeletion: boolean
  speedX: number
  color: number
  maxRadius: number
  constructor(x: number, y: number, size: number, color: number) {
    this.x = x
    this.y = y
    this.radius = (Math.random() * size) / 10
    this.maxRadius = Math.random() * 20 + 35
    this.markedForDeletion = false
    this.speedX = Math.random() * 1 + 0.5
    this.color = color
  }

  update() {
    this.x += this.speedX
    this.radius += 0.2
    if (this.radius > this.maxRadius) this.markedForDeletion = false
  }
  draw() {
    ctx8.beginPath()
    ctx8.fillStyle = '' + this.color
    ctx8.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx8.fill()
  }
}

function drawScore() {
  ctx8.fillStyle = 'black'
  ctx8.fillText('Score: ' + score, 50, 75)
  ctx8.fillStyle = 'white'
  ctx8.fillText('Score: ' + score, 50, 50)
}

function drawGameOver() {
  ctx8.textAlign = 'center'
  ctx8.fillStyle = 'black'
  ctx8.fillText(
    'GAME OVER, your score is ' + score,
    canvas8.width / 2,
    canvas8.height / 2
  )
}

window.addEventListener('click', (ev) => {
  const detectPixelColorr = collosionCtx.getImageData(ev.x, ev.y, 1, 1)
  console.log({ detectPixelColorr })
  const pc = detectPixelColorr.data
  raves.forEach((obj) => () => {
    if (
      obj.randomColors[0] === pc[0] &&
      obj.randomColors[1] === pc[1] &&
      obj.randomColors[2] === pc[2]
    ) {
      obj.markedForDeletion = true
      score++
      explosions2.push(new Explosion2(obj.x, obj.y, obj.width))
    }
  })
})

function animate8(timeStamp: number) {
  ctx8.clearRect(0, 0, canvas8.width, canvas8.height)
  collosionCtx.clearRect(0, 0, canvas8.width, canvas8.height)
  let deltatime = timeStamp - lastTime
  lastTime = timeStamp
  timeToNextRaven += deltatime
  if (timeToNextRaven > ravenInterval) {
    raves.push(new Raven())
    timeToNextRaven = 0
    raves.sort((a, b) => {
      return a.width - b.width // big one to be first
    })
  }
  drawScore()
  ;[...raves, ...explosions2].forEach((obj) => obj.update(deltatime))
  ;[...raves, ...explosions2].forEach((obj) => obj.draw())
  raves = raves.filter((obj) => !obj.markedForDeletion)
  explosions2 = explosions2.filter((obj) => !obj.markedForDeletion)
  if (!gameOver) requestAnimationFrame(animate8)
  else drawGameOver()
}
animate8(0)

/// stop the video at 3:41:35
