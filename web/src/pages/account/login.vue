<script setup lang="ts">
const user = useUserStore()

const router = useRouter()

const username = ref('')
const password = ref('')
const error_message = ref('')

const login = () => {
  error_message.value = ''
  const response = user.handleLogin({
    username: username.value,
    password: password.value,
  })

  response.then((data) => {
    if (data?.return_message === 'success') {
      user.token = data.token
      localStorage.jwtToken = data.token
      const userData = user.getInfo()
      userData.then((res) => {
        if (res?.return_message !== 'error') {
          user.isLogin = true
          user.username = res.username
          user.photo = res.photo
          user.id = res.id
          router.push('/pk/')
        }
      })
    }
    else { error_message.value = 'Wrong username or password.' }
  })
}

const logout = () => {
  user.$reset()
}

const { t } = useI18n()
</script>

<template>
  <div>
    <div text-4xl>
      <div i-carbon-campsite inline-block />
    </div>
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
      @keydown.enter="login"
    >
    <div class="error-message text-red-400">
      {{ error_message }}
    </div>

    <button
      btn m-3 text-sm
      @click="login"
    >
      {{ t('login.login-button') }}
    </button>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
