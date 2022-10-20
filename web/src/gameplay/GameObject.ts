const GAME_OBJECTS: GameObject[] = []

export class GameObject {
  timeDelta: number
  hasCallStart: boolean

  constructor() {
    GAME_OBJECTS.push(this)
    this.timeDelta = 0
    this.hasCallStart = false
  }

  start(): void {
  }

  update(): void {
  }

  onDestroy(): void {
  }

  destroy(): void {
    this.onDestroy()
    for (let i = 0; i < GAME_OBJECTS.length; i++) {
      const obj = GAME_OBJECTS[i]
      if (obj === this) {
        GAME_OBJECTS.splice(i)
        break
      }
    }
  }
}

let lastTimeStamp: number
const tick = (timestamp: number): void => {
  for (const obj of GAME_OBJECTS) {
    if (!obj.hasCallStart) {
      obj.hasCallStart = true
      obj.start()
    }
    else {
      obj.timeDelta = timestamp - lastTimeStamp
      obj.update()
    }
  }
  lastTimeStamp = timestamp
  requestAnimationFrame(tick)
}

requestAnimationFrame(tick)
