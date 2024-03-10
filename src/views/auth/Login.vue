<template>
    <Card class="login-form">
        <template #title>Login</template>
        <template #content>
            <form @submit.prevent="handleSubmit" class="formgroup-block" >
                <InputText type="text" v-model="email" required placeholder="Your email" class="mb-3"/>
                <Password v-model="password" :feedback="false" placeholder="Your password" required class="mb-3"/>
                <div v-if="error" class="error">{{ error }}</div>
                <div>
                    <Button :disabled="isLoading" type="submit" label="Log in"></Button>
                </div>
            </form>
        </template>
    </Card>
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
.login-form {
    max-width: 300px;
    margin: 0 auto;
}

</style>