<script setup lang="ts">
const pk = usePkStore()
const user = useUserStore()
const re = useRecordStore()
const socketUrl = `wss://app3920.acapp.acwing.com.cn/websocket/${user.token}/`

onMounted(() => {
  pk.opponentUsername = 'My Opponent'
  pk.opponentPhoto = '/anonymous.png'

  pk.loser = 'none'
  re.isRecording = false

  const socket = new WebSocket(socketUrl)
  socket.onopen = () => {
    pk.socket = socket
  }

  socket.onmessage = (msg) => {
    const data = JSON.parse(msg.data)
    if (data.event === 'start-matching') {
      pk.opponentUsername = data.opponent_username
      pk.opponentPhoto = data.opponent_photo
      setTimeout(() => {
        pk.status = 'playing'
      }, 200)
      pk.updateGame(data.game)
    }
    else if (data.event === 'move') {
      const game = pk.gameObj
      const [snake0, snake1] = game.snakes
      snake0.setDirection(data.a_direction)
      snake1.setDirection(data.b_direction)
    }
    else if (data.event === 'result') {
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
  <PlayGround v-if="pk.status === 'playing'" class="w-screen-md mx-auto" />
  <MatchGround v-if="pk.status === 'matching'" class="w-screen-md mx-auto" />
  <ResultBoard v-if="pk.loser !== 'none'" class="mx-auto" />
</template>

<route lang="yaml">
meta:
  layout: game
</route>
