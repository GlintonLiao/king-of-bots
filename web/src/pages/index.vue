<script setup lang="ts">
const user = useUserStore()
const name = $ref(user.savedName)

const router = useRouter()
const go = () => {
  if (name)
    router.push(`/hi/${encodeURIComponent(name)}`)
}

router.beforeEach((to, from, next) => {
  console.log("dasd");
  let flag = 1
  const jwtToken = localStorage.getItem('jwtToken')

  if (jwtToken) {
    user.token = jwtToken
    const response = user.getInfo()
    response.then((data) => {
      if (data) {
        user.isLogin = true
        user.username = data.username
        user.photo = data.photo
        user.id = data.id
        router.push('/pk/')
      }
      else {
        alert('token is invalid')
        router.push('/account/login/')
      }
    })
  }
  else {
    flag = 2
  }

  if (to.meta.requestAuth && !user.isLogin) {
    if (flag === 1) {
      next()
    }
    else {
      alert('Please login first')
      next('/account/login')
    }
  }
  else {
    next()
  }
})

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
