<script setup lang="ts">
const user = useUserStore()
const { t } = useI18n()

let currentPage = 1
let totalUsers = 0

const users = ref<any[]>([])
const pages = ref<any[]>([])

const updatePage = () => {
  const maxPage = Math.floor(Math.ceil(totalUsers / 10))
  const newPages = []
  for (let i = currentPage - 2; i <= currentPage + 2; i++) {
    if (i >= 1 && i <= maxPage) {
      newPages.push({
        number: i,
        isActive: i === currentPage,
      })
    }
  }
  pages.value = newPages
}

const clickPage = (page) => {
  if (page === -2) page = currentPage - 1
  else if (page === -1) page = currentPage + 1
  const maxPages = Math.floor(Math.ceil(totalUsers / 10))
  if (page >= 1 && page <= maxPages)
    pullPage(page)
}

async function pullPage(page: number) {
  currentPage = page
  try {
    const response = await fetch(`https://app3920.acapp.acwing.com.cn/api/ranklist/getlist/?page=${page}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    const data = await response.json()
    console.log(data)
    users.value = data.users
    totalUsers = data.user_count
    updatePage()
  }
  catch (err) {
    console.warn(err)
  }
}

pullPage(currentPage)
</script>

<template>
  <div max-w-3xl mx-auto>
    <div class="overflow-x-auto relative shadow-md sm:rounded-lg mb-10 mt-8">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="py-3 px-6">
              Player
            </th>
            <th scope="col" class="py-3 px-6">
              Rating
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in users"
            :key="user.id"
            :class="user.id % 2 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'"
            class=" border-b  dark:border-gray-700"
          >
            <td class="py-3 px-6">
              <div inline-flex items-center space-x-3>
                <img :src="user.photo" w-8 rounded-lg alt="">
                <span>
                  {{ user.username }}
                </span>
              </div>
            </td>
            <td class="py-3 px-6">
              {{ user.rating }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <nav mb-10>
      <ul class="inline-flex -space-x-px">
        <li>
          <a
            href="#" class="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            @click="clickPage(-2)"
          >
            Prev
          </a>
        </li>
        <li>
          <a
            v-for="page in pages" :key="page.number" href="#" :class="page.isActive ? 'text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' : 'text-gray-500 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white hover:bg-gray-100 hover:text-gray-700'" class="py-2 px-3 leading-tight border border-gray-300" @click="clickPage(page.number)"
          >
            {{ page.number }}
          </a>
        </li>
        <li>
          <a href="#" class="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" @click="clickPage(-1)">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<route lang="yaml">
meta:
  layout: user
</route>
