<template>
    <Card class="signup-form">
        <template #title>Sign up</template>
        <template #content>
            <form @submit.prevent="handleSubmit" class="formgroup-block" >
                <InputText type="text" v-model="displayName" required placeholder="Your display name" class="mb-3"/>
                <InputText type="text" v-model="email" required placeholder="Your email" class="mb-3"/>
                <Password v-model="password" :feedback="false" placeholder="Your password" required class="mb-3"/>
                <div v-if="error" class="error">{{ error }}</div>
                <div>
                    <Button :disabled="isLoading" type="submit" label="Sign up"></Button>
                </div>
            </form>
        </template>
    </Card>
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
  .signup-form {
    max-width: 300px;
    margin: 0 auto;
  }
</style>