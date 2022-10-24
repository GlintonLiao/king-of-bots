<script setup lang="ts">
const user = useUserStore()
const name = $ref(user.savedName)

const router = useRouter()
const go = () => {
  if (name)
    router.push(`/hi/${encodeURIComponent(name)}`)
}

// const data = {
//   username: 'lgt',
//   password: 'plgt',
// }
// // backend test
// fetch('http://127.0.0.1:3000/user/account/token/', {
//   method: 'POST',
//   body: new URLSearchParams({
//     username: 'lgt',
//     password: 'plgt',
//   }),
// }).then(resp => resp.json())
//   .then((data) => {
//     console.log(data)
//   })
//   .catch((err) => {
//     console.log(err)
//   })

// fetch('http://127.0.0.1:3000/user/account/info/', {
//   method: 'GET',
//   headers: {
//     Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIwNWJiYzQxZDFiYzI0MTk3ODcxMmNmZGY4YTUxNjllNiIsInN1YiI6IjEiLCJpc3MiOiJzZyIsImlhdCI6MTY2NjQ4MDg1NywiZXhwIjoxNjY3NjkwNDU3fQ.mAVXo57B8btwjpgxLtHM-mFXczjE7gg0XuEtZcNmhqA',
//   },
// }).then(resp => resp.json())
//   .then((data) => {
//     console.log(data)
//   })
//   .catch((err) => {
//     console.log(err)
//   })

// fetch('http://127.0.0.1:3000/user/account/register/', {
//   method: 'POST',
//   body: new URLSearchParams({
//     username: 'lgt',
//     password: 'plgt',
//     confirmedPassword: 'plgt',
//   }),
// }).then(resp => resp.json())
//   .then((data) => {
//     console.log(data)
//   })
//   .catch((err) => {
//     console.log(err)
//   })

const { t } = useI18n()
</script>

<template>
  <div>
    <div text-4xl>
      <div i-carbon-campsite inline-block />
    </div>
    <p>
      <a rel="noreferrer" href="https://github.com/antfu/vitesse" target="_blank">
        Vitesse
      </a>
    </p>
    <p>
      <em text-sm opacity-75>{{ t('intro.desc') }}</em>
    </p>

    <div py-4 />

    <input
      id="input"
      v-model="name"
      :placeholder="t('intro.whats-your-name')"
      :aria-label="t('intro.whats-your-name')"
      type="text"
      autocomplete="false"
      p="x4 y2"
      w="250px"
      text="center"
      bg="transparent"
      border="~ rounded gray-200 dark:gray-700"
      outline="none active:none"
      @keydown.enter="go"
    >
    <label class="hidden" for="input">{{ t('intro.whats-your-name') }}</label>

    <div>
      <button
        btn m-3 text-sm
        :disabled="!name"
        @click="go"
      >
        {{ t('button.go') }}
      </button>
    </div>

    <div>
      <RouterLink
        btn m-3 text-sm
        to="/pk"
      >
        {{ t('button.go') }}
      </RouterLink>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
