<script setup lang="ts">
const user = useUserStore()
const pk = usePkStore()

const matchInfo = ref('Start Matching')
const handleClick = () => {
  if (matchInfo.value === 'Start Matching') {
    matchInfo.value = 'Cancel'
    pk.socket.send(JSON.stringify({
      event: 'start-matching',
    }))
  }
  else {
    matchInfo.value = 'Start Matching'
    pk.socket.send(JSON.stringify({
      event: 'stop-matching',
    }))
  }
}
</script>

<template>
  <div w-60vh h-70vh mx-40 bg-blue>
    <div class="row">
      <div class="col">
        <div class="user-photo">
          <img :src="user.photo" alt="">
        </div>
        <div class="username">
          {{ user.username }}
        </div>
      </div>

      <div class="col">
        <div class="user-photo">
          <img :src="pk.opponentPhoto" alt="">
        </div>
        <div class="username">
          {{ pk.opponentUsername }}
        </div>
      </div>
    </div>
    <div text-center pt-15vh>
      <button @click="handleClick">
        {{ matchInfo }}
      </button>
    </div>
  </div>
</template>
