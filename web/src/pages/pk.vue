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
      setTimeout(() => {
        pk.status = 'playing'
      }, 2000)
      pk.gameMap = data.game.map
      pk.aId = data.game.aId
    }
    else if (data.event === 'move') {
      console.log(data)
      const game = pk.gameObj
      const [snake0, snake1] = game.snakes
      snake0.setDirection(data.a_direction)
      snake1.setDirection(data.b_direction)
    }
    else if (data.event === 'result') {
      console.log(data)
      const game = pk.gameObj
      const [snake0, snake1] = game.snakes

      if (data.loser === 'all' || data.loser === 'A')
        snake0.status = 'die'

      if (data.loser === 'all' || data.loser === 'B')
        snake1.status = 'die'

      pk.loser = data.loser
    }
  }
})
</script>

<template>
  <PlayGround v-if="pk.status === 'playing'" class="w-screen-md h-screen-lg mx-auto" />
  <MatchGround v-if="pk.status === 'matching'" class="w-screen-md mx-auto" />
  <ResultGround v-if="pk.loser !== 'none'" class="w-screen-md mx-auto" />
</template>

<route lang="yaml">
meta:
  layout: game
</route>
