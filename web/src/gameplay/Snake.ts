// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { Cell, DX, DY, GameMap, GameObject } from '../gameplay'

interface SnakeInfo {
  id: number
  color: string
  r: number
  c: number
}

export class Snake extends GameObject {
  id: number
  color: string
  gameMap: GameMap
  cells: Cell[]
  nextCell: Cell
  speed: number
  direction: number
  status: 'idle' | 'move' | 'die'
  round: number
  eps: number
  eyeDirection: number
  eyeDx: number[][]
  eyeDy: number[][]

  constructor(info: SnakeInfo, gameMap: GameMap) {
    super()

    this.id = info.id
    this.color = info.color
    this.gameMap = gameMap

    this.cells = [new Cell(info.r, info.c)] // snake body, cell[0] is head
    this.nextCell = new Cell(-1, -1) // dummy

    // how many block per second
    this.speed = 5
    // -1 -> none, 0 -> up, 1 -> right, 2 -> down, 3 -> left
    this.direction = -1
    // idle / move / die
    this.status = 'idle'

    // number of rounds
    this.round = 0
    // deviation
    this.eps = 1e-2

    if (this.id === 1) this.eyeDirection = 2
    else this.eyeDirection = 0

    this.eyeDx = [
      [-1, 1],
      [1, 1],
      [1, -1],
      [-1, -1],
    ]
    this.eyeDy = [
      [-1, -1],
      [-1, 1],
      [1, 1],
      [1, -1],
    ]
  }

  start(): void {

  }

  setDirection(d: number): void {
    this.direction = d
  }

  // first 10 rounds, don't increase
  // and then increase every 3 rounds
  checkTailIncreasing(): boolean {
    if (this.round <= 10) return true
    if (this.round % 3 === 1) return true
    return false
  }

  // calculate the snake state at next step
  nextStep() {
    const d = this.direction
    this.nextCell = new Cell(
      this.cells[0].r + DX[d],
      this.cells[0].c + DY[d],
    )
    this.eyeDirection = d
    this.direction = -1 // clear direction
    this.status = 'move' // update signal
    this.round++

    for (let i = this.cells.length; i > 0; i--)
      this.cells[i] = JSON.parse(JSON.stringify(this.cells[i - 1]))
  }

  updateMove(): void {
    const dx = this.nextCell.x - this.cells[0].x
    const dy = this.nextCell.y - this.cells[0].y
    const distance = Math.sqrt(dx * dx + dy * dy)

    // current head reaches the nextCell
    if (distance < this.eps) {
      this.cells[0] = this.nextCell
      this.status = 'idle'
      // see if the snake is increasing
      if (!this.checkTailIncreasing()) this.cells.pop()
    }
    else {
      const moveDistance = this.speed * this.timeDelta / 1000 // move distance between 2 frames
      this.cells[0].x += moveDistance * dx / distance
      this.cells[0].y += moveDistance * dy / distance

      // see if the snake is increasing
      if (!this.checkTailIncreasing()) {
        const k = this.cells.length
        const tail = this.cells[k - 1]
        const tailTarget = this.cells[k - 2]

        const tailDx = tailTarget.x - tail.x
        const tailDy = tailTarget.y - tail.y

        tail.x += moveDistance * tailDx / distance
        tail.y += moveDistance * tailDy / distance
      }
    }
  }

  update(): void {
    if (this.status === 'move') this.updateMove()
    this.render()
  }

  render(): void {
    const len = this.gameMap.len
    const ctx = this.gameMap.ctx

    ctx.fillStyle = this.status === 'die' ? 'white' : this.color

    for (const cell of this.cells) {
      ctx.beginPath()
      ctx.arc(cell.x * len, cell.y * len, len / 2 * 0.8, 0, Math.PI * 2)
      ctx.fill()
    }

    for (let i = 1; i < this.cells.length; i++) {
      const a = this.cells[i - 1]
      const b = this.cells[i]
      if (Math.abs(a.x - b.x) < this.eps && Math.abs(a.y - b.y) < this.eps) continue
      if (Math.abs(a.x - b.x) < this.eps)
        ctx.fillRect((a.x - 0.4) * len, Math.min(a.y, b.y) * len, len * 0.8, Math.abs(a.y - b.y) * len)
      else
        ctx.fillRect(Math.min(a.x, b.x) * len, (a.y - 0.4) * len, Math.abs(a.x - b.x) * len, len * 0.8)
    }

    // eyes
    ctx.fillStyle = 'black'
    for (let i = 0; i < 2; i++) {
      const eyeX = (this.cells[0].x + this.eyeDx[this.eyeDirection][i] * 0.15) * len
      const eyeY = (this.cells[0].y + this.eyeDy[this.eyeDirection][i] * 0.15) * len

      ctx.beginPath()
      ctx.arc(eyeX, eyeY, len * 0.05, 0, Math.PI * 2)
      ctx.fill()
    }
  }
}
