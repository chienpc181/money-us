<template>
    <Card class="create-transaction-form">
        <template #title>
            <div class="flex justify-content-center">
                Create transaction
            </div>
        </template>
        <template #content>
            <form @submit.prevent="handleSubmit" class="formgroup-block" >
                <InputText type="text" v-model="name" required placeholder="Name" class="my-3 w-full"/>
                <InputNumber type="text" v-model="amount" required placeholder="Amount" class="mb-3 w-full"/>
                <Textarea v-model="description" rows="5" cols="30" placeholder="Description" class="mb-3 w-full"/>
                <div class="flex-auto">
                    <Calendar v-model="transactionAt" showIcon :showOnFocus="false" dateFormat="dd/mm/yy" placeholder="At" class="mb-3 w-full" />
                </div>
                <Dropdown v-model="transactionType" :options="transactionTypes" optionLabel="name" placeholder="Select type" checkmark :highlightOnSelect="false" class="mb-3 w-full" />
                <div class="mb-6">
                    <label for="isMonthlyCost" class="mr-3"> Is monthly cost </label>
                    <Checkbox v-model="isMonthlyCost"  :binary="true"/>
                </div>

                <div class="flex justify-content-center">
                    <Button type="submit" label="Create"></Button>
                </div>
            </form>
        </template>
    </Card>
</template>

<script setup>
import { ref } from 'vue';
import useStorage from '@/composables/useStorage';
import useCollection from '@/composables/useCollection';
import getUser from '@/composables/getUser';
import router from '@/router';
import { timestamp } from '@/firebase/config';



const name = ref('');
const amount = ref();
const description = ref('');
const transactionType = ref('');
const isMonthlyCost = ref(true);
const transactionAt = ref('');
// const file = ref(null);
const fileError = ref(null);
const {url, filePath, error, uploadFile} = useStorage();
const {addDocument} = useCollection("transactions");
const {user} = getUser();
const transactionTypes = ref([
    { name: 'Decor', code: 'Decor' },
    { name: 'Foods & Drinks', code: 'FoodAndDrink' },
    { name: 'Travelling', code: 'Travelling' },
    { name: 'Children', code: 'Children' },
    { name: 'Others', code: 'Others' },
]);
    
const handleSubmit = async () => {
    const docRef = await (addDocument({
        name: name.value,
        amount: amount.value,
        description: description.value,
        transactionType: transactionType.value,
        isMonthlyCost: isMonthlyCost.value,
        transactionAt: transactionAt.value,
        createdAt: timestamp(),
        modifiedAt: timestamp(),
        createdBy: user.value.displayName,
        modifiedBy: user.value.displayName,
    }));
    
    router.push({name: "all-transactions"} )
    
}
</script>
<style scoped>
.create-transaction-form {
    max-width: 400px;
    margin: 0 auto;
  }
</style>