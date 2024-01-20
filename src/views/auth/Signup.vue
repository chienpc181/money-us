<template>
    <form @submit.prevent="handleSubmit">
      <h2>Sign up</h2>
      <input type="text" placeholder="Your display name" v-model="displayName" required>
      <input type="email" placeholder="Your email" v-model="email" required>
      <input type="password" placeholder="Your password" v-model="password" required>
      <div v-if="error" class="error">{{ error }}</div>
      <div class="btn-submit-form">
        <button :disabled="isLoading">Sign up</button>
      </div>
    </form>
  </template>
  
  <script>
  import useSignup from '@/composables/useSignup';
  import { ref } from 'vue';
  
  export default {
      setup() {
          const {error, signup, isLoading} = useSignup();
          const displayName = ref('');
          const email = ref('');
          const password = ref('');
  
          const handleSubmit = async () => {
              const res = await signup(email.value, password.value, displayName.value);
              if (!error.value) {
                  console.log('user signed up');
              }
          }
  
          return {displayName, email, password, handleSubmit, error, isLoading}
      }
  }
  </script>
  <style scoped>

  </style>