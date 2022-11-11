import { acceptHMRUpdate, defineStore } from 'pinia'

interface LoginProps {
  username: string
  password: string
}

export const useUserStore = defineStore('user', () => {
  /**
   * Current name of the user.
   */
  const savedName = ref('')
  const previousNames = ref(new Set<string>())

  const id = ref('')
  const username = ref('')
  const photo = ref('')
  const token = ref('')
  const isLogin = ref(false)

  const usedNames = computed(() => Array.from(previousNames.value))
  const otherNames = computed(() => usedNames.value.filter(name => name !== savedName.value))

  /**
   * Changes the current name of the user and saves the one that was used
   * before.
   *
   * @param name - new name to set
   */
  function setNewName(name: string) {
    if (savedName.value)
      previousNames.value.add(savedName.value)

    savedName.value = name
  }

  async function handleLogin(data: LoginProps) {
    try {
      const response = await fetch('https://app3920.acapp.acwing.com.cn/api/user/account/token/', {
        method: 'POST',
        body: new URLSearchParams({
          username: data.username,
          password: data.password,
        }),
      })
      if (response.ok) return response.json()
      else throw new Error(response.statusText)
    }
    catch (err) {
      return err
    }
  }

  async function getInfo() {
    try {
      const response = await fetch('https://app3920.acapp.acwing.com.cn/api/user/account/info/', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })
      if (response.ok) return await response.json()
      else throw new Error(response.statusText)
    }
    catch (err) {
      return err
    }
  }

  return {
    setNewName,
    handleLogin,
    getInfo,
    id,
    username,
    photo,
    token,
    isLogin,
    otherNames,
    savedName,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
