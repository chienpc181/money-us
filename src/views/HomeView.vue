<template>
    <div>
        <Toast />
        <Toolbar class="mb-4">
            <template #start>
                <Button label="" icon="pi pi-plus" severity="success" class="mr-2" @click="createTransaction" />
                <!-- <Button label="Delete" icon="pi pi-trash" severity="danger" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" /> -->
            </template>

            <template #end>
                <!-- <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import"
                    class="mr-2 inline-block" v-tooltip="'Import form csv file'"/> -->
                <Button label="" icon="pi pi-upload" severity="help" @click="exportCSV($event)" v-tooltip="'Export to csv file'" />
            </template>
        </Toolbar>
        <DataTable ref="dt" :value="transactions" tableStyle="min-width: 50rem" dataKey="id" paginator :rows="10"
             selectionMode="single" :metaKeySelection="true"
            v-model:selection="selectedTransaction" :filters="filters">
            <template #header>
                <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                    <h4 class="m-0">All transactions</h4>
                    <IconField iconPosition="left">
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText v-model="filters['global'].value" placeholder="Search..." />
                    </IconField>
                </div>
            </template>
            <Column field="name" header="Name"></Column>
            <Column field="amount" header="Amount" dataType="numeric">
                <template #body="{ data }">
                    {{ formatCurrency(data.amount) }}
                </template>
            </Column>
            <Column field="transactionType.name" header="Type"></Column>
            <Column field="description" header="Description"></Column>
            <Column header="Date" dataType="date" style="width: 5rem">
                <template #body="{ data }">
                    {{ formatDate(data.transactionAt) }}
                </template>
            </Column>
            <!-- <Column :rowEditor="true" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center"></Column> -->
            <Column :exportable="false" style="min-width:8rem">
                <template #body="{ data }">
                    <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editTransaction(data)" />
                    <Button icon="pi pi-trash" outlined rounded severity="danger"
                        @click="confirmDeleteTransaction(data)" />
                </template>
            </Column>
        </DataTable>
    </div>
    <Dialog v-model:visible="transactionDialog" :style="{ width: '450px' }" :modal="true" class="p-fluid">
        <template #header>
            <div class="inline-flex align-items-center justify-content-center gap-2">
                <!-- <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" /> -->
                <span class="font-bold white-space-nowrap">{{actionTitle}}</span>
            </div>
        </template>
        <!-- <img v-if="transaction.image" :src="`https://primefaces.org/cdn/primevue/images/transaction/${transaction.image}`"
            :alt="transaction.image" class="block m-auto pb-3" /> -->
        <div class="field">
            <label for="name">Name</label>
            <InputText id="name" v-model.trim="transaction.name" required="true" autofocus
                :class="{ 'p-invalid': submitted && !transaction.name }" />
            <small class="p-error" v-if="submitted && !transaction.name">Name is required.</small>
        </div>
        <div class="field">
            <label for="name">Amount</label>
            <InputNumber id="name" v-model.trim="transaction.amount" required="true" autofocus
                :class="{ 'p-invalid': submitted && !transaction.amount }" />
            <small class="p-error" v-if="submitted && !transaction.amount">Amount is required.</small>
        </div>
        <div class="field">
            <label for="description">Description</label>
            <Textarea id="description" v-model="transaction.description" required="true" rows="3" cols="20" />
        </div>
        <div class="field">
            <label for="transactionAt">Date</label>
            <Calendar id="transactionAt" v-model="transaction.transactionAt" showIcon :showOnFocus="false"
                dateFormat="dd/mm/yy" required="true" />
        </div>
        <div class="field">
            <label for="type" class="mb-3">Type</label>
            <Dropdown id="type" v-model="transaction.transactionType" :options="transactionTypes" optionLabel="name"
                placeholder="Select type" checkmark :highlightOnSelect="false" required="true" />
        </div>
        <div class="field">
            <Checkbox v-model="transaction.isMonthlyCost" :binary="true" />
            <label for="isMonthlyCost" class="ml-2 mb-0">Montly cost</label>
        </div>
        <template #footer>
            <Button label="Cancel" icon="pi pi-times" text severity="secondary" outlined @click="hideDialog" />
            <Button label="Save" icon="pi pi-check" text outlined @click="saveTransaction" />
        </template>
    </Dialog>
    <Dialog v-model:visible="deleteTransactionDialog" :style="{width: '450px'}" header="Delete transaction"
        :modal="true">
        <div class="confirmation-content">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span v-if="transaction">Are you sure you want to delete <b>{{transaction.name}}</b>?</span>
        </div>
        <template #footer>
            <Button label="No" icon="pi pi-times" text @click="deleteTransactionDialog = false" />
            <Button label="Yes" icon="pi pi-check" text @click="deleteTransaction" />
        </template>
    </Dialog>

</template>

<script setup>
import getCollection from '@/composables/getCollectionWithQuery';
import useCollection from '@/composables/useCollection';
import getUser from '@/composables/getUser';
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import { timestamp } from '@/firebase/config';
import { FilterMatchMode } from 'primevue/api';


const toast = useToast();
const dt = ref();
const {addDocument, updateDocument, deleteDocument} = useCollection("transactions");
const {user} = getUser();
const transactionDialog = ref(false);
const deleteTransactionDialog = ref(false);
const transaction = ref({});
const submitted = ref(false);
const actionTitle = ref();
const filters = ref({
    'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
});
const transactionTypes = ref([
    { name: 'Decor', code: 'Decor' },
    { name: 'Foods & Drinks', code: 'FoodAndDrink' },
    { name: 'Travelling', code: 'Travelling' },
    { name: 'Children', code: 'Children' },
    { name: 'Others', code: 'Others' },
]);
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
// });
const orderTransactions = [];
orderTransactions.push({
    field: "transactionAt",
    isAscending: false
});
orderTransactions.push({
    field: "createdAt",
    isAscending: false
});

const {error: errorLoadItems, documents: transactions} = getCollection("transactions", queryTransactions, orderTransactions);
const formatCurrency = (value) => {
    return value.toLocaleString('vn-VN', { style: 'currency', currency: 'VND' });
};
const formatDate = (value) => {
    value = value.toDate();
    let formattedDate = value.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    
    // formattedDate = formattedDate.replace(/\./g, '/');
    return formattedDate;
};
const selectedTransaction = ref();
const editTransaction = (tran) => {
    actionTitle.value = "Update transaction";
    transaction.value = {...tran};
    transaction.value.transactionAt = transaction.value.transactionAt.toDate();
    transactionDialog.value = true;
};
const confirmDeleteTransaction = (tran) => {
    transaction.value = tran;
    deleteTransactionDialog.value = true;
    
};
const deleteTransaction = async () => {
    // transactions.value = transactions.value.filter(val => val.id !== transaction.value.id);
    await deleteDocument("transactions", transaction.value.id);
    deleteTransactionDialog.value = false;
    transaction.value = {};
    toast.add({severity:'success', summary: 'Successful', detail: 'Transaction deleted', life: 3000});
};

const hideDialog = () => {
    transactionDialog.value = false;
    submitted.value = false;
};
const saveTransaction = async () => {
    submitted.value = true;
    
    if (transaction.value.id) {
        toast.add({severity:'success', summary: 'Successful', detail: 'Transaction updated', life: 3000});
        
        await updateDocument(transaction.value.id, transaction.value);
    }
    else {
        const newTran = {...transaction.value,
            createdAt: timestamp(),
            modifiedAt: timestamp(),
            createdBy: user.value.displayName,
            modifiedBy: user.value.displayName,
        };

        await addDocument(newTran);
        toast.add({severity:'success', summary: 'Successful', detail: 'Transaction created', life: 3000});
    }
    
    transactionDialog.value = false;
    transaction.value = {};
};

const createTransaction = async () => {
    actionTitle.value = "Create transaction";
    transaction.value = {};
    transaction.value.isMonthlyCost = true;
    transaction.value.transactionAt = new Date();
    submitted.value = false;
    transactionDialog.value = true;
}

const exportCSV = () => {
    dt.value.exportCSV();
};

</script>
