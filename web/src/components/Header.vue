<script setup lang="ts">
const { t } = useI18n()
const user = useUserStore()
const route = useRoute()
const isShow = ref(true)

const logout = () => {
  localStorage.removeItem('jwtToken')
  user.username = ''
  user.id = ''
  user.photo = ''
  user.isLogin = false
  user.token = ''
}

const show = () => {
  isShow.value = !isShow.value
}
</script>

<template>
  <nav class="text-md mb-5 flex justify-around color-bluegray">
    <button class="flex items-center mr--15">
      <div i-carbon-scatter-matrix />
      &nbsp;
      <RouterLink to="/" font-bold>
        KING OF BOTS
      </RouterLink>
    </button>
    <div>
      <button class="px-5" :class="route.name === 'pk' ? 'text-gray-700' : ''">
        <RouterLink to="/pk/">
          {{ t('header.battle') }}
        </RouterLink>
      </button>
      <button class="px-5" :class="route.name === 'record' ? 'text-gray-700' : ''">
        <RouterLink to="/record/">
          {{ t('header.game-record') }}
        </RouterLink>
      </button>
      <button class="px-5" :class="route.name === 'ranklist' ? 'text-gray-700' : ''">
        <RouterLink to="/ranklist/">
          {{ t('header.rankings') }}
        </RouterLink>
      </button>
    </div>

    <div v-if="user.isLogin" class="dropdown">
      <button class="dropbtn" @click="show">
        {{ user.username }}
      </button>
      <div class="w-40 fixed m-t-2 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600" :class="{ show: isShow }">
        <RouterLink to="/user/bot/">
          <div py-3 px-4 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white @click="show">
            User Center
          </div>
        </RouterLink>
        <button w-full py-3 px-4 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white @click="logout">
          Logout
        </button>
      </div>
    </div>
    <div v-else>
      <RouterLink p-x-3 to="/account/login">
        Login
      </RouterLink>
      <RouterLink to="/account/register">
        Register
      </RouterLink>
    </div>
  </nav>
</template>

<style scoped>
.show {
  display: none;
}
</style>
