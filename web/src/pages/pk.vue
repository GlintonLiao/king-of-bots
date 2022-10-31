<script setup lang="ts">
const pk = usePkStore()
const user = useUserStore()
const socketUrl = `ws://127.0.0.1:3000/websocket/${user.token}/`

onMounted(() => {
  pk.opponentUsername = 'My Opponent'
  pk.opponentPhoto = 'https://cdn.acwing.com/media/article/image/2022/08/09/1_1db2488f17-anonymous.png'

  const socket = new WebSocket(socketUrl)
  socket.onopen = () => {
    console.log('connected!')
    pk.socket = socket
  }

  socket.onmessage = (msg) => {
    const data = JSON.parse(msg.data)
    if (data.event === 'start-matching') {
      pk.opponentUsername = data.opponent_username
      pk.opponentPhoto = data.opponent_photo
    }
    setTimeout(() => {
      pk.status = 'playing'
    }, 2000)
    pk.gameMap = data.game_map
  }
})
</script>

<template>
  <PlayGround v-if="pk.status === 'playing'" class="w-screen-md h-screen-lg mx-auto" />
  <MatchGround v-if="pk.status === 'matching'" class="w-screen-md h-screen-lg mx-auto" />
</template>

<route lang="yaml">
meta:
  layout: game
</route>
