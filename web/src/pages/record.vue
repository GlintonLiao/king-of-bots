<script setup lang="ts">
const user = useUserStore()
const pk = usePkStore()
const re = useRecordStore()
const router = useRouter()
const { t } = useI18n()

let currentPage = 1
let totalRecords = 0

const records = ref<any[]>([])

const stringTo2D = map => {
  let g = []
  for (let i = 0, k = 0; i < 13; i++) {
    let line = []
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
    const response = await fetch(`http://127.0.0.1:3000/record/getlist/?page=${page}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    const data = await response.json()
    console.log(data)
    records.value = data.records
    totalRecords = data.record_count
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
          <tr v-for="record in records" :key="record.record.id"
            :class="record.record.id % 2 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'"
            class=" border-b  dark:border-gray-700">
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
              <button class="font-bold p-2 p-x-3 rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-800"
                @click="openRecordPage(record.record.id)">
                View Recording
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: user
</route>
