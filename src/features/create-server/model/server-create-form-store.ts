import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { createServer } from '../api'

export const useServerCreateFormStore = defineStore('server-create-form', () => {
  const loading = ref(false)

  const form = reactive<ServerCreateForm>({
    photo: null,
    name: '',
    description: '',
  })

  function resetForm() {
    form.photo = null
    form.name = ''
    form.description = ''
  }

  function validateForm() {
    if (!form.name) return 'Server name required'
  }

  async function submitForm() {
    const error = validateForm()
    if (error) return error

    try {
      loading.value = true

      await createServer(form)
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    form,
    resetForm,
    submitForm,
  }
})

interface ServerCreateForm {
  photo: Blob | null
  name: string
  description: string
}
