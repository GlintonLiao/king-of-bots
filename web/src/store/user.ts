import { acceptHMRUpdate, defineStore } from 'pinia'

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

  async function handleLogin(data) {
    const response = await fetch('http://127.0.0.1:3000/user/account/token/', {
      method: 'POST',
      body: new URLSearchParams({
        username: data.username,
        password: data.password,
      }),
    }).then(resp => {
      if (!resp.ok) throw new Error(resp.statusText)
      return resp.json()
    }).then((res) => {
      if (res.return_message === 'success') token.value = res.token
      return res
    }).catch((err) => {
      console.log(err)
      return {
        return_message: 'error',
      }
    })
    return response
  }

  async function getInfo() {
    const response = await fetch('http://127.0.0.1:3000/user/account/info/', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    }).then((resp) => {
      if (!resp.ok) throw new Error(resp.statusText)
      return resp.json()
    }).catch(err => console.log(err))
    return response
  }

  return {
    setNewName,
    handleLogin,
    getInfo,
    isLogin,
    otherNames,
    savedName,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
