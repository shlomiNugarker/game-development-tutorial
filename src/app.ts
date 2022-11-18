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
  //   ctx.drawImage(image,sx,sy,sw,sh,dx,dy,dw,dh) // Reference
  let position =
    Math.floor(gameFrame / staggerFrames) %
    spriteAnimation[playerState].loc.length
  let frameX = spriteWidth * position
  let frameY = spriteAnimation[playerState].loc[position].y
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
