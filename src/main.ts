// window.addEventListener('load', function () {
import { Player } from './player'
import { InputHandler } from './input'

const canvas = <HTMLCanvasElement>document.getElementById('canvas')
const ctx = canvas.getContext('2d')!
canvas.width = 500
canvas.height = 500

export class Game {
  width: number
  height: number
  player: Player
  input: InputHandler
  groundMargin: number

  constructor(width: number, height: number) {
    this.width = width
    this.height = height
    this.groundMargin = 50
    this.player = new Player(this)
    this.input = new InputHandler()
  }

  update(deltaTime: number) {
    this.player.update(this.input.keys, deltaTime)
  }

  draw(context: CanvasRenderingContext2D) {
    this.player.draw(context)
  }
}

const game = new Game(canvas.width, canvas.height)
console.log(game)

let lastTime = 0

function animate(timeStamp: number) {
  const deltaTime = timeStamp - lastTime
  // console.log(deltaTime)

  lastTime = timeStamp
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  game.update(deltaTime)
  game.draw(ctx)
  requestAnimationFrame(animate)
}

animate(0)

// })
