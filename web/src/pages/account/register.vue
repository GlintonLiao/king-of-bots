<script setup lang="ts">
const router = useRouter()

const username = ref('')
const password = ref('')
const confirmedPassword = ref('')
const error_message = ref('')

const register = () => {
  const response = fetch('https://app3920.acapp.acwing.com.cn/api/user/account/register/', {
    method: 'POST',
    body: new URLSearchParams({
      username: username.value,
      password: password.value,
      confirmedPassword: confirmedPassword.value,
    }),
  }).then(resp => resp.json())

  response.then((data) => {
    if (data?.return_message === 'success')
      router.push('/account/login/')
    else
      error_message.value = data.return_message
  })
}

const { t } = useI18n()
</script>

<template>
  <div>
    <div text-4xl>
      <div i-carbon-campsite inline-block />
    </div>
    <p>
      <a rel="noreferrer" href="" target="_blank">
        {{ t('register.title') }}
      </a>
    </p>

    <div py-4 />

    <input
      id="username"
      v-model="username"
      :placeholder="t('register.username-holder')"
      :aria-label="t('register.username-holder')"
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
      id="password"
      v-model="password"
      :placeholder="t('register.password-holder')"
      :aria-label="t('register.password-holder')"
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
    >

    <input
      id="confirmedPassword"
      v-model="confirmedPassword"
      :placeholder="t('register.confirmed-password-holder')"
      :aria-label="t('register.confirmed-password-holder')"
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
      @keydown.enter="register"
    >
    <div class="error-message text-red-400">
      {{ error_message }}
    </div>

    <div class="flex justify-center">
      <button
        btn m-3 text-sm
        :disabled="!confirmedPassword && !password"
        @click="register"
      >
        {{ t('register.register-button') }}
      </button>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
