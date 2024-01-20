import { ref } from 'vue'
import { projectAuth } from '../firebase/config'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

const error = ref(null)
const isLoading = ref(false)

const signup = async (email, password, displayName) => {
  error.value = null
  isLoading.value = true
  try {
    const res = await createUserWithEmailAndPassword(projectAuth, email, password)
    if (!res) {
      throw new Error('Could not complete signup')
    }

    await updateProfile(projectAuth.currentUser, {
      displayName: displayName
    });
    error.value = null
    
    return res
  }
  catch(err) {
    console.log(err.message)
    error.value = err.message
  }
  finally {
    isLoading.value = false
  }
}

const useSignup = () => {
  return { error, signup, isLoading }
}

export default useSignup