import { DX, DY, GameObject, Wall } from '../gameplay'

export class GameMap extends GameObject {
  // attributes
  ctx: CanvasRenderingContext2D
  parent: HTMLDivElement
  len: number
  rows: number
  cols: number
  innerWallsCount: number
  wall: Wall[]

  constructor(ctx: CanvasRenderingContext2D, parent: HTMLDivElement) {
    super()

    this.ctx = ctx
    this.parent = parent
    this.len = 0

    this.rows = 13
    this.cols = 13

    this.innerWallsCount = 20
    this.wall = []
  }

  isConnected(grid: boolean[][], x: number, y: number, targetX: number, targetY: number): boolean {
    if (x === targetX && y === targetY)
      return true

    grid[x][y] = true

    for (let i = 0; i < 4; i++) {
      const xx = x + DX[i]
      const yy = y + DY[i]
      if (!grid[xx][yy] && this.isConnected(grid, xx, yy, targetX, targetY))
        return true
    }
    return false
  }

  createWall(): boolean {
    const grid: boolean[][] = []

    // init
    for (let r = 0; r < this.rows; r++) {
      grid[r] = []
      for (let c = 0; c < this.cols; c++)
        grid[r][c] = false
    }

    // set surrounding walls
    for (let r = 0; r < this.rows; r++)
      grid[r][0] = grid[r][this.cols - 1] = true
    for (let c = 0; c < this.cols; c++)
      grid[0][c] = grid[this.rows - 1][c] = true

    // random walls inside
    for (let i = 0; i < this.innerWallsCount / 2; i++) {
      for (let j = 0; j < 1000; j++) {
        const r = Math.floor(Math.random() * this.rows)
        const c = Math.floor(Math.random() * this.cols)
        // already walls
        if (grid[r][c] || grid[c][r])
          continue
        // omit two start points
        if ((r === this.rows - 2 && c === 1) || (r === 1 && c === this.cols - 2))
          continue
        // set the centrosymmetric walls
        grid[r][c] = grid[c][r] = true
        break
      }
    }

    // copy grid to check connectivity
    const copyGrid = JSON.parse(JSON.stringify(grid))
    if (!this.isConnected(copyGrid, this.rows - 2, 1, 1, this.cols - 2))
      return false

    // pass the connectivity check, then we add wall object in grid
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (grid[r][c])
          this.wall.push(new Wall(r, c, this))
      }
    }

    // success
    return true
  }

  start(): void {
    // traverse 1000 times, if we can create, then break
    for (let i = 0; i < 1000; i++) {
      if (this.createWall())
        break
    }
  }

  updateSize(): void {
    this.len = Math.floor(Math.min(this.parent.clientWidth / this.cols, this.parent.clientHeight / this.rows))
    this.ctx.canvas.width = this.len * this.cols
    this.ctx.canvas.height = this.len * this.rows
  }

  update(): void {
    this.updateSize()
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
