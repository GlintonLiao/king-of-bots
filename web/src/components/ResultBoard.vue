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
  <div class="h-30vh w-40vw absolute top-30vh left-1/2 translate-x--1/2 bg-light shadow-lg">
    <div v-if="pk.loser === 'all'" text-center color-white font-50 text-xl p-t-5vh>
      Draw
    </div>
    <div v-else-if="pk.loser === 'A' && pk.aId === parseInt(user.id)" text-xl text-center color-white font-50 p-t-5vh>
      Lose
    </div>
    <div v-else-if="pk.loser === 'B' && pk.bId === parseInt(user.id)" text-xl text-center color-white font-50 p-t-5vh>
      Lose
    </div>
    <div v-else text-center text-xl color-white font-50 p-t-5vh>
      Win
    </div>
    <div>
      <button type="button" btn m-t-10 text-center @click="restart">
        Restart
      </button>
    </div>
  </div>
</template>
