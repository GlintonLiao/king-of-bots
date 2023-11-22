<script setup lang="ts">
import ace from 'ace-builds'
import { VAceEditor } from 'vue3-ace-editor'
const user = useUserStore()

interface Bot {
  title: string
  id: string
  description: string
  content: string
}

ace.config.set(
  'basePath',
  'https://cdn.jsdelivr.net/npm/ace-builds@1.12.5/src-noconflict/',
)

const newBot = reactive({
  title: '',
  description: '',
  content: '',
  return_message: '',
})

const errorMessage = ref('')

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

const showModal = (id: string) => {
  const obj = document.getElementById(id)
  obj?.classList.remove('hidden')
}

const hideModal = (id: string) => {
  const obj = document.getElementById(id)
  obj?.classList.add('hidden')
  errorMessage.value = ''
}

const addBot = () => {
  fetch('https://app3920.acapp.acwing.com.cn/api/user/bot/add/', {
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
      hideModal('add-bot-modal')
      refreshBots()
    }
    else {
      errorMessage.value = data.return_message
    }
  }).catch(err => err)
}

const updateBot = (bot: Bot) => {
  fetch('https://app3920.acapp.acwing.com.cn/api/user/bot/update/', {
    method: 'POST',
    body: new URLSearchParams({
      bot_id: bot.id,
      title: bot.title,
      description: bot.description,
      content: bot.content,
    }),
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  }).then((resp) => {
    if (resp.ok)
      return resp.json()
  }).then((data) => {
    if (data.return_message === 'success') {
      hideModal(`update-bot-modal-${bot.id}`)
      refreshBots()
    }
    else {
      errorMessage.value = data.return_message
    }
  }).catch(err => err)
}

const removeBot = (bot: Bot) => {
  fetch('https://app3920.acapp.acwing.com.cn/api/user/bot/remove/', {
    method: 'POST',
    body: new URLSearchParams({
      bot_id: bot.id,
    }),
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  }).then((resp) => {
    if (resp.ok)
      return resp.json()
  }).then((data) => {
    if (data.return_message === 'success')
      refreshBots()
    else
      errorMessage.value = data.return_message
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
      <div
        rel="noreferrer" text-2xl flex font-500 justify-between href="https://github.com/antfu/vitesse"
        target="_blank"
      >
        <div w-15 />
        {{ t('user.title') }}
        <button btn text-sm mr-8 bg-blue-700 hover-bg-blue-800 @click="showModal('add-bot-modal')">
          <div i-carbon-add />
        </button>
      </div>

      <!-- Large Modal -->
      <div
        id="add-bot-modal"
        tabindex="-1"
        class="hidden overflow-y-auto overflow-x-hidden w-50vw fixed z-50 left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] md:h-full"
      >
        <div class="relative p-4 w-full max-w-4xl h-full md:h-auto">
          <!-- Modal content -->
          <div div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <!-- Modal header -->
            <div class="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
              <h3 class="text-xl font-medium text-gray-900 dark:text-white">
                Add Bot
              </h3>
              <button
                type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                @click="hideModal('add-bot-modal')"
              >
                <svg
                  aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>

            <div px-5 py-2>
              <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Title</label>
              <textarea id="message" v-model="newBot.title" rows="1" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Please enter bot title..." />
            </div>
            <div px-5 py-2>
              <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Description</label>
              <textarea id="message" v-model="newBot.description" rows="1" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Please enter bot description..." />
            </div>
            <div px-5 py-2>
              <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Content</label>
              <VAceEditor
                v-model:value="newBot.content"
                lang="java"
                :theme="isDark ? 'nord_dark' : 'chrome'"
                style="height: 10rem"
                @init="editorInit"
              />
            </div>

            <div class="flex justify-end items-center p-4 space-x-2 rounded-b">
              <div class="error-message text-red-400">
                {{ errorMessage }}
              </div>
              <button
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                @click="addBot"
              >
                Save Changes
              </button>
              <button
                data-modal-toggle="large-modal" type="button"
                class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                @click="hideModal('add-bot-modal')"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      <ul mt-2 px-6 max-h-60vh overflow-scroll>
        <li v-for="bot in bots" :key="bot.id" p-2 flex justify-between border-b-1>
          <div flex-1>
            {{ bot.title }}
          </div>
          <button btn mx-2 text-sm @click="showModal(`update-bot-modal-${bot.id}`)">
            Change
          </button>
          <button btn bg-red-700 hover-bg-red-800 text-sm @click="removeBot(bot)">
            Delete
          </button>

          <!-- Large Modal -->
          <div
            :id="`update-bot-modal-${bot.id}`"
            tabindex="-1"
            class="hidden overflow-y-auto overflow-x-hidden w-50vw fixed z-50 left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] md:h-full"
          >
            <div class="relative p-4 w-full max-w-4xl h-full md:h-auto">
              <!-- Modal content -->
              <div div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
                  <h3 class="text-xl font-medium text-gray-900 dark:text-white">
                    Modify Bot
                  </h3>
                  <button
                    type="button"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    @click="hideModal(`update-bot-modal-${bot.id}`)"
                  >
                    <svg
                      aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="sr-only">Close modal</span>
                  </button>
                </div>

                <div px-5 py-2>
                  <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Title</label>
                  <textarea id="message" v-model="bot.title" rows="1" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Please enter bot title..." />
                </div>
                <div px-5 py-2>
                  <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Description</label>
                  <textarea id="message" v-model="bot.description" rows="1" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Please enter bot description..." />
                </div>
                <div px-5 py-2>
                  <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Content</label>
                  <VAceEditor
                    v-model:value="bot.content"
                    lang="java"
                    :theme="isDark ? 'nord_dark' : 'chrome'"
                    style="height: 10rem"
                    @init="editorInit"
                  />
                </div>

                <div class="flex justify-end items-center p-4 space-x-2 rounded-b">
                  <button
                    type="button"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    @click="updateBot(bot)"
                  >
                    Save Changes
                  </button>
                  <button
                    data-modal-toggle="large-modal" type="button"
                    class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    @click="hideModal(`update-bot-modal-${bot.id}`)"
                  >
                    Cancel
                  </button>
                  <div class="error-message text-red-400">
                    {{ errorMessage }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: user
</route>
