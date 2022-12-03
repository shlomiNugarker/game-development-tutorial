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

export class Splash extends Particle {
  gravity: number
  image: HTMLImageElement
  constructor(game: Game, x: number, y: number) {
    super(game)
    this.size = Math.random() * 100 + 100 // 10 to 200
    this.x = x - this.size * 0.4
    this.y = y - this.size * 0.5
    this.speedX = Math.random() * 6 - 4
    this.speedY = Math.random() * 2 + 2 // 2-4
    this.gravity = 0
    this.image = document.getElementById('fire') as HTMLImageElement
  }
  update() {
    super.update()
    this.gravity += 0.1
    if (this.y) this.y += this.gravity
  }
  draw(context: CanvasRenderingContext2D) {
    if (!this.x || !this.y || !this.size) return
    context.drawImage(this.image, this.x, this.y, this.size, this.size)
  }
}

export class Fire extends Particle {
  image: HTMLImageElement
  angle: number
  va: number

  constructor(game: Game, x: number, y: number) {
    super(game)
    this.image = document.getElementById('fire') as HTMLImageElement
    this.size = Math.random() * 100 + 50
    this.x = x - this.size * 0.4
    this.y = y - this.size * 0.5
    this.speedX = 1
    this.speedY = 1
    this.angle = 0
    this.va = Math.random() * 0.2 - 0.1
  }
  update(): void {
    super.update()
    this.angle += this.va
    if (this.x) this.x += Math.sin(this.angle * 5)
  }
  draw(context: CanvasRenderingContext2D) {
    if (!this.x || !this.y || !this.size) return
    context.save()
    context.translate(this.x, this.y)
    context.rotate(this.angle)
    context.drawImage(
      this.image,
      -this.size * 0.5,
      -this.size * 0.5,
      this.size,
      this.size
    )
    context.restore()
  }
}
