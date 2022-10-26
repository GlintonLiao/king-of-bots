<script setup lang="ts">
const user = useUserStore()

interface Bot {
  title: string
  id: number
}

const newBot = reactive({
  title: '',
  description: '',
  content: '',
  return_message: '',
})

const errorMessage = ref('')

const bots = ref<Bot[]>([])

const refreshBots = () => {
  fetch('http://127.0.0.1:3000/user/bot/getlist/', {
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

const toggleModal = () => {

}

const addBot = () => {
  fetch('http://127.0.0.1:3000/user/bot/add/', {
    method: 'POST',
    body: new URLSearchParams({
      title: newBot.title,
      description: newBot.description,
      content: newBot.content,
    }),
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  }).then((resp) => {
    if (resp.ok)
      return resp.json()
  }).then((data) => {
    if (data.return_message === 'success') {
      newBot.title = ''
      newBot.description = ''
      newBot.content = ''
      refreshBots()
    }
    else {
      errorMessage.value = data.return_message
    }
  }).catch(err => err)
}

const { t } = useI18n()
</script>

<template>
  <div py-2 />
  <div flex>
    <div shadow-lg mr-3 rd-3 h-60 overflow-hidden>
      <img :src="user.photo" alt="" mb-3>
      <p>{{ user.username }}</p>
    </div>

    <div text-left w-full shadow-lg rd-3>
      <div rel="noreferrer" text-2xl flex font-500 justify-between href="https://github.com/antfu/vitesse" target="_blank">
        <div w-15 />
        {{ t('user.title') }}
        <button btn text-sm mr-8 bg-blue-700 hover-bg-blue-800>
          <div i-carbon-add />
        </button>
      </div>

      <ul mt-2 px-6 max-h-60vh overflow-scroll>
        <li v-for="bot in bots" :key="bot.id" p-2 flex justify-between border-b-1>
          <div flex-1>
            {{ bot.title }}
          </div>
          <button btn mx-2 text-sm @click="toggleModal">
            Change
          </button>
          <button btn bg-red-700 hover-bg-red-800 text-sm>
            Delete
          </button>
        </li>
      </ul>
    </div>

    <div class="error-message text-red-400">
      {{ errorMessage }}
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: user
</route>
