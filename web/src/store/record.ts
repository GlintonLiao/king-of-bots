import { acceptHMRUpdate, defineStore } from 'pinia'

export const useRecordStore = defineStore('record', () => {
  const isRecording = ref(false)
  const a_steps = ref('')
  const b_steps = ref('')
  const recordLoser = ref('')

  const updateSteps = (data: any) => {
    a_steps.value = data.a_steps
    b_steps.value = data.b_steps
  }

  return {
    isRecording,
    recordLoser,
    a_steps,
    b_steps,
    updateSteps,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePkStore, import.meta.hot))
