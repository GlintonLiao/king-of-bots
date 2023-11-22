// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { GameMap, GameObject } from '../gameplay'

export class Wall extends GameObject {
  r: number
  c: number
  map: GameMap
  color: string

  constructor(r: number, c: number, map: GameMap) {
    super()
    this.r = r
    this.c = c
    this.map = map
    this.color = '#213C3F'
  }

  update(): void {
    this.render()
  }

  render(): void {
    const len = this.map.len
    const ctx = this.map.ctx
    ctx.fillStyle = isDark.value ? '#007575' : '#C6847B'
    ctx.fillRect(this.c * len, this.r * len, len, len)
  }
}
