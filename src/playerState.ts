import { Player } from './player'

// enum:
const states = {
  SITTING: 0,
  RUNNING: 1,
  JUMPING: 2,
  FALLING: 3,
}

export class State {
  state: string

  constructor(state: string) {
    this.state = state
  }
}

export class Sitting extends State {
  player: Player

  constructor(player: Player) {
    super('SITTING')
    this.player = player
  }
  enter() {
    this.player.frameX = 0
    this.player.maxFrame = 4
    this.player.frameY = 5
  }

  handleInput(input: string[]) {
    if (input.includes('ArrowLeft') || input.includes('ArrowRight')) {
      this.player.setState(states.RUNNING, 1)
    }
  }
}

export class Running extends State {
  player: Player

  constructor(player: Player) {
    super('RUNNING')
    this.player = player
  }
  enter() {
    this.player.frameX = 0
    this.player.maxFrame = 8
    this.player.frameY = 3
  }

  handleInput(input: string[]) {
    if (input.includes('ArrowDown')) {
      this.player.setState(states.SITTING, 0)
    } else if (input.includes('ArrowUp')) {
      this.player.setState(states.JUMPING, 1)
    }
  }
}
export class Jumping extends State {
  player: Player

  constructor(player: Player) {
    super('JUMPING')
    this.player = player
  }
  enter() {
    if (this.player.onGround()) this.player.vy -= 27
    this.player.frameX = 0
    this.player.maxFrame = 6
    this.player.frameY = 1
  }

  handleInput(_input: string[]) {
    if (this.player.vy > this.player.weight) {
      this.player.setState(states.FALLING, 1)
    }
  }
}

export class Falling extends State {
  player: Player
  constructor(player: Player) {
    super('FALLING')
    this.player = player
  }
  enter() {
    this.player.frameX = 0
    this.player.maxFrame = 6
    this.player.frameY = 2
  }

  handleInput(_input: string[]) {
    if (this.player.onGround()) {
      this.player.setState(states.RUNNING, 1)
    }
  }
}
