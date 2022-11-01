import { acceptHMRUpdate, defineStore } from 'pinia'

export const usePkStore = defineStore('pk', () => {
  const status = ref('matching')
  const socket = ref<WebSocket>()
  const opponentUsername = ref('')
  const opponentPhoto = ref('')
  const gameMap = ref(null)

  const aId = ref(0)
  const aSx = ref(0)
  const aSy = ref(0)
  const bId = ref(0)
  const bSx = ref(0)
  const bSy = ref(0)

  const gameObj = ref()
  const loser = ref('none')

  function updateGame(game: any) {
    gameMap.value = game.map
    aId.value = game.a_id
    aSx.value = game.a_sx
    aSy.value = game.a_sy
    bId.value = game.b_id
    bSx.value = game.b_sx
    bSy.value = game.b_sy
  }

  return {
    status,
    socket,
    opponentUsername,
    opponentPhoto,
    gameMap,
    aId,
    aSx,
    aSy,
    bId,
    bSx,
    bSy,
    gameObj,
    loser,
    updateGame,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePkStore, import.meta.hot))
