<script setup lang="ts">
const user = useUserStore()
const pk = usePkStore()
const re = useRecordStore()
const router = useRouter()
const { t } = useI18n()

let currentPage = 1
let totalRecords = 0

const records = ref<any[]>([])
const pages = ref<any[]>([])

const updatePage = () => {
  const maxPage = Math.floor(Math.ceil(totalRecords / 10))
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

const clickPage = (page: number) => {
  if (page === -2) page = currentPage - 1
  else if (page === -1) page = currentPage + 1
  const maxPages = Math.floor(Math.ceil(totalRecords / 10))
  if (page >= 1 && page <= maxPages)
    pullPage(page)
}

const stringTo2D = (map: string) => {
  const g = []
  for (let i = 0, k = 0; i < 13; i++) {
    const line = []
    for (let j = 0; j < 14; j++, k++) {
      if (map[k] === '0') line.push(0)
      else line.push(1)
    }
    g.push(line)
  }
  return g
}

function openRecordPage(id: number) {
  for (const record of records.value) {
    if (record.record.id === id) {
      re.isRecording = true
      pk.updateGame({
        map: stringTo2D(record.record.map),
        a_id: record.record.aid,
        a_sx: record.record.asx,
        a_sy: record.record.asy,
        b_id: record.record.bid,
        b_sx: record.record.bsx,
        b_sy: record.record.bsy,
      })
      re.updateSteps({
        a_steps: record.record.asteps,
        b_steps: record.record.bsteps,
      })
      re.recordLoser = record.record.loser
      router.push(`/recording/${encodeURIComponent(id)}`)
      break
    }
  }
}

async function pullPage(page: number) {
  currentPage = page
  try {
    const response = await fetch(`https://app3920.acapp.acwing.com.cn/api/record/getlist/?page=${page}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    const data = await response.json()
    records.value = data.records
    totalRecords = data.record_count
    updatePage()
  }
  catch (err) {
    console.warn(err)
  }
}

pullPage(currentPage)
</script>

<template>
  <div max-w-4xl mx-auto>
    <div class="overflow-x-auto relative shadow-md sm:rounded-lg mb-10 mt-8">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="py-3 px-6">
              Player A
            </th>
            <th scope="col" class="py-3 px-6">
              Player B
            </th>
            <th scope="col" class="py-3 px-6">
              Battle Result
            </th>
            <th scope="col" class="py-3 px-6">
              Time
            </th>
            <th scope="col" class="py-3 px-6">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="record in records"
            :key="record.record.id"
            :class="record.record.id % 2 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'"
            class=" border-b  dark:border-gray-700"
          >
            <td class="py-3 px-6">
              <div inline-flex items-center space-x-3>
                <img :src="record.a_photo" w-8 rounded-lg alt="">
                <span>
                  {{ record.a_username }}
                </span>
              </div>
            </td>
            <td class="py-3 px-6">
              <div inline-flex items-center space-x-3>
                <img :src="record.b_photo" w-8 rounded-lg alt="">
                <span>
                  {{ record.b_username }}
                </span>
              </div>
            </td>
            <td class="py-3 px-6">
              {{ record.result }}
            </td>
            <td class="py-3 px-6">
              {{ record.record.createTime }}
            </td>
            <td class="py-3 px-6">
              <button
                class="font-bold p-2 p-x-3 rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-800"
                @click="openRecordPage(record.record.id)"
              >
                View Recording
              </button>
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
  layout: record
</route>
