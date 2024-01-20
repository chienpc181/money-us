<template>
    <h2>{{ id }}</h2>
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

export default {
    props: ['id'],
    
    setup() {
        // const route = useRoute();
        // const paramId = ref(null);
        // // console.log(route.params.id);
        // paramId.value = route.params.id;

        // return {paramId}
    }
}
</script>
<style scoped>

</style>