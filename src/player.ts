import { Game } from './main'
import { Sitting, Running, Jumping, Falling, Rolling } from './playerState'

export class Player {
  game: Game
  width: number
  height: number
  x: number
  y: number
  image: HTMLImageElement
  speed: number
  maxSpeed: number
  vy: number
  weight: number
  state: Sitting[]
  currentState: Sitting
  frameX: number
  frameY: number
  maxFrame: number
  fps: number
  frameInterval: number
  frameTimer: number
  gameSpeed: number | undefined

  constructor(game: Game) {
    this.game = game
    this.width = 100 // & height of the player Depends on the sprite img
    this.height = 91.3
    this.x = 0
    this.y = this.game.height - this.height - this.game.groundMargin
    this.vy = 0 // vertical y
    this.weight = 1
    this.image = document.getElementById('player') as HTMLImageElement

    this.frameX = 0 // frames to choose player sprite img
    this.frameY = 0
    this.maxFrame = 0

    this.fps = 20
    this.frameInterval = 1000 / this.fps
    this.frameTimer = 0

    this.speed = 0
    this.maxSpeed = 4

    // the order is important (enum):
    this.state = [
      new Sitting(this),
      new Running(this),
      new Jumping(this),
      new Falling(this),
      new Rolling(this),
    ]
    this.currentState = this.state[0]
    this.currentState.enter()
  }

  update(input: string[], deltaTime: number) {
    this.checkCollision()
    this.currentState.handleInput(input)
    // horizontal movement
    this.x += this.speed
    // handle input also here for moving with all states
    if (input.includes('ArrowRight')) this.speed = this.maxSpeed
    else if (input.includes('ArrowLeft')) this.speed = -this.maxSpeed
    //
    else this.speed = 0
    if (this.x < 0) this.x = 0
    if (this.x > this.game.width - this.width)
      this.x = this.game.width - this.width
    // vertical movement

    this.y += this.vy
    if (!this.onGround()) this.vy += this.weight
    else this.vy = 0

    // sprite animation:
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0
      if (this.frameX < this.maxFrame) this.frameX++
      else this.frameX = 0
    } else {
      this.frameTimer += deltaTime
    }
  }
  draw(context: CanvasRenderingContext2D) {
    if (this.game.debug)
      context.strokeRect(this.x, this.y, this.width, this.height)

    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }

  onGround() {
    return this.y >= this.game.height - this.height - this.game.groundMargin
  }

  setState(state: number, speed: number) {
    this.currentState = this.state[state]
    this.game.speed = this.game.maxSpeed * speed
    this.currentState.enter()
  }
  checkCollision() {
    this.game.enemies.forEach((enemy) => {
      if (!enemy.x || !enemy.y || !enemy.width || !enemy.height) return
      if (
        enemy.x < this.x + this.width &&
        enemy.x + enemy.width > this.x &&
        enemy.y < this.y + this.height &&
        enemy.y + enemy.height > this.y
      ) {
        enemy.markedForDeletion = true
        this.game.score++
      } else {
        //
      }
    })
  }
}
