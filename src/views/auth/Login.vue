<template>
  <form @submit.prevent="handleSubmit">
    <h2>Login</h2>
    <input type="email" placeholder="Your email" v-model="email" required>
    <input type="password" placeholder="Your password" v-model="password" required>
    <div v-if="error" class="error">{{ error }}</div>
    <div class="btn-submit-form">
        <button :disabled="isLoading" type="submit">Log in</button>
    </div>
    
  </form>
</template>

<script>
import useLogin from '@/composables/useLogin';
import { onMounted, ref } from 'vue';
import router from '@/router';

export default {
    setup() {
        const {error, login, isLoading} = useLogin();
        const email = ref('');
        const password = ref('');

        const handleSubmit = async () => {
            const res = await login(email.value, password.value);
            if (!error.value) {
                console.log('user logged in');
                router.push({name: 'home'});
            }
        }

        return {email, password, handleSubmit, error, isLoading}
    }
}
</script>
<style scoped>

</style>