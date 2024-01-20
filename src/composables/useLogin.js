import { ref } from 'vue'
import { projectAuth } from '../firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth'

const error = ref(null)
const isLoading = ref(false)

const login = async (email, password) => {
  error.value = null
  isLoading.value = true
  try {
    const res = await signInWithEmailAndPassword(projectAuth, email, password)
    error.value = null
    return res
  }
  catch(err) {
    console.log(err.message)
    error.value = 'Incorrect login credentials'
  }
  finally {
    isLoading.value = false
  }
}

const useLogin = () => {
  return { error, login, isLoading }
}

export default useLogin