// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { Cell, GameObject, Snake, Wall } from '../gameplay'

export class GameMap extends GameObject {
  // attributes
  ctx: CanvasRenderingContext2D
  parent: HTMLDivElement
  len: number
  rows: number
  cols: number
  innerWallsCount: number
  walls: Wall[] = []
  snakes: Snake[]
  pk: any
  record: any

  constructor(ctx: CanvasRenderingContext2D, parent: HTMLDivElement) {
    super()

    this.ctx = ctx
    this.parent = parent
    this.len = 0

    this.pk = usePkStore()
    this.record = useRecordStore()

    this.rows = 13
    this.cols = 14 // prevents two snakes run into same block at same time

    this.innerWallsCount = 20
    this.walls = []

    this.snakes = [
      new Snake({
        id: 0,
        color: '#395144',
        r: this.rows - 2,
        c: 1,
      }, this),
      new Snake({
        id: 1,
        color: '#AA8B56',
        r: 1,
        c: this.cols - 2,
      }, this),
    ]
  }

  createWall(): void {
    const grid = this.pk.gameMap
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++)
        if (grid[r][c]) this.walls.push(new Wall(r, c, this))
    }
  }

  checkValid(cell: Cell): boolean {
    for (const wall of this.walls)
      if (wall.r === cell.r && wall.c === cell.c) return false

    // traverse two snakes
    for (const snake of this.snakes) {
      let k = snake.cells.length
      if (!snake.checkTailIncreasing()) k-- // tail moving, then don' t check tail
      for (let i = 0; i < k; i++)
        if (snake.cells[i].r === cell.r && snake.cells[i].c === cell.c) return false
    }
    return true
  }

  handleInput(): void {
    if (this.record.isRecording) {
      let k = 0
      const aSteps = this.record.a_steps
      const bSteps = this.record.b_steps
      const loser = this.record.recordLoser
      const [snake0, snake1] = this.snakes
      const intervalId = setInterval(() => {
        if (k >= aSteps.length - 1) {
          if (loser === 'all' || loser === 'A')
            snake0.status = 'die'
          if (loser === 'all' || loser === 'B')
            snake1.status = 'die'
          clearInterval(intervalId)
        }
        else {
          snake0.setDirection(parseInt(aSteps[k]))
          snake1.setDirection(parseInt(bSteps[k]))
        }
        k++
      }, 300)
    }
    else {
      this.ctx.canvas.focus()
      this.ctx.canvas.addEventListener('keydown', (e) => {
        let d = -1
        if (e.key === 'w') d = 0
        else if (e.key === 'd') d = 1
        else if (e.key === 's') d = 2
        else if (e.key === 'a') d = 3

        if (d >= 0) {
          this.pk.socket.send(JSON.stringify({
            event: 'move',
            direction: d,
          }))
        }
      })
    }
  }

  start(): void {
    this.createWall()
    this.handleInput()
  }

  // check if both snakes are idle
  // so we can start next round
  checkReady(): boolean {
    for (const snake of this.snakes) {
      if (snake.status !== 'idle') return false
      if (snake.direction === -1) return false
    }
    return true
  }

  nextRound(): void {
    for (const snake of this.snakes) snake.nextStep()
  }

  updateSize(): void {
    this.len = Math.floor(Math.min(this.parent.clientWidth / this.cols, this.parent.clientHeight / this.rows))
    this.ctx.canvas.width = this.len * this.cols
    this.ctx.canvas.height = this.len * this.rows
  }

  update(): void {
    this.updateSize()
    if (this.checkReady()) this.nextRound()
    this.render()
  }

  render(): void {
    const evenColor = isDark.value ? '#141414' : '#EFEFEF'
    const oddColor = isDark.value ? '#1E1E1E' : '#E2E2E2'
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if ((r + c) % 2 === 0)
          this.ctx.fillStyle = evenColor
        else
          this.ctx.fillStyle = oddColor
        // render
        this.ctx.fillRect(c * this.len, r * this.len, this.len, this.len)
      }
    }
  }
}
