import { acceptHMRUpdate, defineStore } from 'pinia'

export const usePkStore = defineStore('pk', () => {
  const status = ref('matching')
  const socket = ref<WebSocket>()
  const opponentUsername = ref('')
  const opponentPhoto = ref('')
  const gameMap = ref(null)

  return {
    status,
    socket,
    opponentUsername,
    opponentPhoto,
    gameMap,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePkStore, import.meta.hot))
