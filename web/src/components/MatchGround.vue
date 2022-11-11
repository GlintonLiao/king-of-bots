<script setup lang="ts">
interface Bot {
  title: string
  id: string
  description: string
  content: string
}

const selectedBot = ref('-1')

const user = useUserStore()
const pk = usePkStore()

const matchInfo = ref('Start Matching')
const handleClick = () => {
  if (matchInfo.value === 'Start Matching') {
    matchInfo.value = 'Cancel'
    pk.socket?.send(JSON.stringify({
      event: 'start-matching',
      bot_id: selectedBot.value,
    }))
  }
  else {
    matchInfo.value = 'Start Matching'
    pk.socket?.send(JSON.stringify({
      event: 'stop-matching',
    }))
  }
}

const bots = ref<Bot[]>([])

const refreshBots = () => {
  fetch('https://app3920.acapp.acwing.com.cn/api/user/bot/getlist/', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  }).then((resp) => {
    if (resp.ok)
      return resp.json()
  }).then((data) => {
    bots.value = data
  }).catch(err => err)
}

refreshBots()
</script>

<template>
  <div w-60vh h-70vh mx-auto>
    <div flex justify-around p-8>
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
    <div text-left w-50 mx-auto>
      <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select an option</label>
      <select id="countries" v-model="selectedBot" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option selected value="-1">
          Play by myself
        </option>
        <option v-for="bot in bots" :key="bot.id" :value="bot.id">
          {{ bot.title }}
        </option>
      </select>
    </div>

    <div text-center pt-6>
      <button btn @click="handleClick">
        {{ matchInfo }}
      </button>
    </div>
  </div>
</template>
