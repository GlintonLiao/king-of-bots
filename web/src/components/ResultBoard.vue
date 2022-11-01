<script setup lang="ts">
const pk = usePkStore()
const user = useUserStore()

const restart = () => {
  pk.status = 'matching'
  pk.loser = 'none'
  pk.opponentUsername = 'My Opponent'
  pk.opponentPhoto = 'https://cdn.acwing.com/media/article/image/2022/08/09/1_1db2488f17-anonymous.png'
}
</script>

<template>
  <div class="result-board h-30vh w-30vw absolute top-30vh left-35vw bg-light-blue-200">
    <div v-if="pk.loser === 'all'" text-center color-white font-50 p-t-5vh>
      Draw
    </div>
    <div v-else-if="pk.loser === 'A' && pk.aId === parseInt(user.id)" text-center color-white font-50 p-t-5vh>
      Lose
    </div>
    <div v-else-if="pk.loser === 'B' && pk.bId === parseInt(user.id)" text-center color-white font-50 p-t-5vh>
      Lose
    </div>
    <div v-else text-center color-white font-50 p-t-5vh>
      Win
    </div>
    <div>
      <button type="button" btn p-t-10 text-center @click="restart">
        Restart
      </button>
    </div>
  </div>
</template>
