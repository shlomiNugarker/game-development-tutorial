import { Game } from './main'

export class Enemy {
  frameX: number
  frameY: number
  fps: number
  frameInterval: number
  frameTimer: number
  speedX: any
  speedY: any
  maxFrame: number
  markedForDeletion: boolean

  x: number | undefined
  y: number | undefined
  game: Game | undefined
  width: number | undefined
  image: HTMLImageElement | CanvasImageSource | undefined
  height: number | undefined

  constructor() {
    this.frameX = 0
    this.frameY = 0
    this.maxFrame = 3
    this.fps = 20
    this.frameInterval = 1000 / this.fps
    this.frameTimer = 0
    this.markedForDeletion = false
  }
  update(deltaTime: number) {
    // movement
    if (this.x) this.x -= (this.game && this.speedX + this.game.speed) || 0
    this.y += this.speedY
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0
      if (this.frameX < this.maxFrame) this.frameX++
      else this.frameX = 0
    } else {
      this.frameTimer += deltaTime
    }
    // check if off screen
    if (this.width && this.x && this.x + this.width < 0)
      this.markedForDeletion = true
  }
  draw(context: CanvasRenderingContext2D) {
    if (this.image && this.width && this.height && this.x && this.y) {
      context.drawImage(
        this.image,
        this.frameX * this.width,
        0,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      )
    }
  }
}

export class FlyingEnemy extends Enemy {
  angle: number
  va: number

  constructor(game: Game) {
    super()
    this.game = game
    this.width = 60
    this.height = 44
    this.x = this.game.width + Math.random() * this.game.width * 0.5
    this.y = Math.random() * this.game.height * 0.5
    this.speedX = Math.random() + 1
    this.speedY = 0
    this.maxFrame = 5
    this.image = document.getElementById('enemy_fly') as HTMLImageElement
    this.angle = 0
    this.va = Math.random() * 0.1 + 0.1
  }

  update(deltaTime: number) {
    super.update(deltaTime)
    this.angle += this.va
    if (this.y) this.y += Math.sin(this.angle)
  }
}

export class GroundEnemy extends Enemy {
  constructor(game: Game) {
    super()
    this.game = game
    this.width = 60
    this.height = 87
    this.x = this.game.width
    this.y = this.game.height - this.height - this.game.groundMargin
    this.image = document.getElementById('enemy_plant') as HTMLImageElement
    this.speedX = 0
    this.speedY = 0
    this.maxFrame = 1
  }
}

export class ClimbingEnemy extends Enemy {
  constructor(game: Game) {
    super()
    this.game = game
    this.width = 120
    this.height = 144
    this.x = this.game.width
    this.y = Math.random() * this.game.height * 0.5
    this.image = document.getElementById('enemy_spider_big') as HTMLImageElement
    this.speedX = 0
    this.speedY = Math.random() > 0.5 ? 1 : -1
    this.maxFrame = 5
  }

  update(deltaTime: number): void {
    super.update(deltaTime)
    if (
      this.y &&
      this.game &&
      this.y > this.game?.height - this.game.groundMargin
    )
      this.speedY *= -1

    if (this.y && this.height && this.y < -this.height)
      this.markedForDeletion = true
  }
  draw(context: CanvasRenderingContext2D): void {
    if (!this.x) return
    if (!this.y) return
    if (!this.width) return
    super.draw(context)
    context.beginPath()
    context.moveTo(this.x + this.width / 2, 0)
    context.lineTo(this.x + this.width / 2, this.y + 50)
    context.stroke()
  }
}
