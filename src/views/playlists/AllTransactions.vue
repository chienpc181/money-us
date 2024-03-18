<template>
    <DataTable :value="transactions" tableStyle="min-width: 50rem">
        <Column field="name" header="Name"></Column>
        <Column field="amount" header="Amount" dataType="numeric">
            <template #body="{ data }">
                {{ formatCurrency(data.amount) }}
            </template>
        </Column>
        <Column field="transactionType.name" header="Type"></Column>
        <Column field="description" header="Description"></Column>
        <Column header="Date" dataType="date" style="width: 5rem" >
            <template #body="{ data }" >
                {{ formatDate(data.transactionAt) }}
            </template>
        </Column>
    </DataTable>
</template>

<script setup>
import getCollection from '@/composables/getCollectionWithQuery';
import getUser from '@/composables/getUser';

const {user} = getUser();
const queryTransactions = [];
// queryTransactions.push({
//     field: "playListId",
//     operator: "==",
//     // value: props.id
// })
// queryTransactions.push({
//     field: "userId",
//     operator: "==",
//     value: user.value.uid
// })

const {error: errorLoadItems, documents: transactions} = getCollection("transactions", queryTransactions, []);
const formatCurrency = (value) => {
    return value.toLocaleString('vn-VN', { style: 'currency', currency: 'VND' });
    // return value.toString() + "đ";
};
const formatDate = (value) => {
    value = new Date(value.seconds*1000);
    return value.toLocaleDateString('da-DK', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};



</script>
<style scoped>

</style>