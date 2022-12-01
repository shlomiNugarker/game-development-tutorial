import { Game } from './main'

export class UI {
  game: Game
  fontFamily: string
  fontSize: number

  constructor(game: Game) {
    this.game = game
    this.fontSize = 30
    this.fontFamily = 'Helvetica'
  }
  draw(context: CanvasRenderingContext2D) {
    context.font = this.fontSize + 'px ' + this.fontFamily
    context.textAlign = 'left'
    context.fillStyle = this.game.fontColor
    // score
    context.fillText('Score: ' + this.game.score, 20, 50)
  }
}
