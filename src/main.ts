// window.addEventListener('load', function () {
import { Player } from './player'
import { InputHandler } from './input'
import { Background } from './background'
import { FlyingEnemy, GroundEnemy, Enemy, ClimbingEnemy } from './enemies'
import { UI } from './UI'
import { Dust, Fire, Particle, Splash } from './particles'
import { CollisionAnimation } from './collisionAnimation'

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
  speed: number
  background: Background
  maxSpeed: number
  enemies: Enemy[]
  enemyTimer: number
  enemyInterval: number
  debug: boolean
  score: number
  fontColor: string
  UI: UI
  particles: Particle[]
  maxParticles: number
  collisions: CollisionAnimation[]
  time: number
  maxTime: number
  gameOver: boolean

  constructor(width: number, height: number) {
    this.width = width
    this.height = height
    this.groundMargin = 80
    this.speed = 0
    this.maxSpeed = 3
    this.player = new Player(this)
    this.background = new Background(this)
    this.input = new InputHandler(this)
    this.UI = new UI(this)
    this.enemies = []
    this.particles = []
    this.collisions = []
    this.maxParticles = 50
    this.enemyTimer = 0
    this.enemyInterval = 1000
    this.debug = false
    this.score = 0
    this.fontColor = 'black'
    this.time = 0
    this.maxTime = 20000
    this.gameOver = false
    this.player.currentState = this.player.states[0]
    this.player.currentState.enter()
  }

  update(deltaTime: number) {
    this.time += deltaTime
    if (this.time > this.maxTime) this.gameOver = true
    this.background.update()
    this.player.update(this.input.keys, deltaTime)
    // handleEnemies
    if (this.enemyTimer > this.enemyInterval) {
      this.addEnemy()
      this.enemyTimer = 0
    } else {
      this.enemyTimer += deltaTime
    }
    this.enemies.forEach((enemy) => {
      enemy.update(deltaTime)
      if (enemy.markedForDeletion)
        this.enemies.splice(this.enemies.indexOf(enemy), 1)
    })

    // handle particles
    this.particles.forEach((particle, index) => {
      particle.update()
      if (particle.markedForDeletion) this.particles.splice(index, 1)
    })
    if (this.particles.length > this.maxParticles) {
      this.particles.length = this.maxParticles
    }
    // handle collision sprites
    this.collisions.forEach((collision, index) => {
      collision.update(deltaTime)
      if (collision.markedForDeletion) this.collisions.splice(index, 1)
    })
  }

  draw(context: CanvasRenderingContext2D) {
    this.background.draw(context)
    this.player.draw(context)
    this.enemies.forEach((enemy) => {
      enemy.draw(context)
    })
    this.particles.forEach((particle) => {
      if (particle instanceof Dust) particle.draw(context)
      else if (particle instanceof Fire) particle.draw(context)
      else if (particle instanceof Splash) particle.draw(context)
    })
    this.collisions.forEach((collision) => {
      if (collision instanceof CollisionAnimation) collision.draw(context)
    })
    this.UI.draw(context)
  }
  addEnemy() {
    if (this.speed > 0 && Math.random() < 0.5) {
      this.enemies.push(new FlyingEnemy(this))
    } else if (this.speed > 0) {
      this.enemies.push(new ClimbingEnemy(this))
    }
    this.enemies.push(new GroundEnemy(this))
  }
}

const game = new Game(canvas.width, canvas.height)

let lastTime = 0

function animate(timeStamp: number) {
  const deltaTime = timeStamp - lastTime
  lastTime = timeStamp
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  game.update(deltaTime)
  game.draw(ctx)
  if (!game.gameOver) requestAnimationFrame(animate)
}

animate(0)

// })

// 09:24:48
