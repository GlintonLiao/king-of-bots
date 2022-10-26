<script setup lang="ts">
const user = useUserStore()

const router = useRouter()

const username = ref('')
const password = ref('')
const error_message = ref('')

const handleBot = () => {
  return null
}

// fetch('http://127.0.0.1:3000/user/bot/add/', {
//   method: 'POST',
//   body: new URLSearchParams({
//     title: 'Bot title',
//     description: 'Bot description',
//     content: 'Bot content',
//   }),
//   headers: {
//     Authorization: `Bearer ${user.token}`,
//   },
// }).then(data => console.log(data))

const { t } = useI18n()
</script>

<template>
  <div>
    <p>
      <a rel="noreferrer" href="https://github.com/antfu/vitesse" target="_blank">
        {{ t('login.title') }}
      </a>
    </p>

    <div py-4 />

    <input
      id="input"
      v-model="username"
      :placeholder="t('login.username-holder')"
      :aria-label="t('login.username-holder')"
      type="text"
      autocomplete="false"
      p="x4 y2"
      w="250px"
      class="display-block mx-auto"
      text="center"
      bg="transparent"
      border="~ rounded gray-200 dark:gray-700"
      outline="none active:none"
    >

    <input
      id="input"
      v-model="password"
      :placeholder="t('login.password-holder')"
      :aria-label="t('login.password-holder')"
      type="password"
      autocomplete="false"
      class="display-block  mx-auto"
      p="x4 y2"
      m="y2"
      w="250px"
      text="center"
      bg="transparent"
      border="~ rounded gray-200 dark:gray-700"
      outline="none active:none"
      @keydown.enter="handleBot"
    >
    <div class="error-message text-red-400">
      {{ error_message }}
    </div>

    <button
      btn m-3 text-sm
      @click="handleBot"
    >
      {{ t('login.login-button') }}
    </button>
  </div>
</template>

<route lang="yaml">
meta:
  layout: user
</route>
