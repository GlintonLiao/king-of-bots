<script setup lang="ts">
const user = useUserStore()
const pk = usePkStore()

const matchInfo = ref('Start Matching')
const handleClick = () => {
  if (matchInfo.value === 'Start Matching') {
    matchInfo.value = 'Cancel'
    pk.socket?.send(JSON.stringify({
      event: 'start-matching',
    }))
  }
  else {
    matchInfo.value = 'Start Matching'
    pk.socket?.send(JSON.stringify({
      event: 'stop-matching',
    }))
  }
}
</script>

<template>
  <div w-60vh h-70vh mx-auto>
    <div flex justify-around p-10>
      <div p-6 max-w-50>
        <div shadow-lg>
          <img :src="user.photo" alt="">
        </div>
        <div mt-5>
          {{ user.username }}
        </div>
      </div>

      <div p-6 max-w-50>
        <div shadow-lg>
          <img :src="pk.opponentPhoto" alt="">
        </div>
        <div mt-5>
          {{ pk.opponentUsername }}
        </div>
      </div>
    </div>
    <div text-center pt-6>
      <button btn @click="handleClick">
        {{ matchInfo }}
      </button>
    </div>
  </div>
</template>
