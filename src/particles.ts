import { Game } from './main'

export class Particle {
  markedForDeletion: boolean
  game: Game
  x: number | undefined
  y: number | undefined
  speedX: number | undefined
  speedY: number | undefined
  size: number | undefined
  fillStyle: string | undefined

  constructor(game: Game) {
    this.game = game
    this.markedForDeletion = false
  }
  update() {
    if (!this.size || !this.x || !this.speedX || !this.speedY || !this.y) return
    this.x -= this.speedX + this.game.speed
    this.y -= this.speedY
    this.size *= 0.95
    if (this.size < 0.5) this.markedForDeletion = true
  }
}

export class Dust extends Particle {
  size: number
  x: number
  y: number
  speedX: number
  color: string
  speedY: number

  constructor(game: Game, x: number, y: number) {
    super(game)
    this.size = Math.random() * 10 + 10
    this.x = x
    this.y = y
    this.speedX = Math.random()
    this.speedY = Math.random()
    this.color = 'rgba(0,0,0,0.2)'
  }
  draw(context: CanvasRenderingContext2D) {
    context.beginPath()
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    context.fillStyle = this.color
    context.fill()
  }
}

export class Splash extends Particle {}

export class Fire extends Particle {}

// 8:55:04
