<template>
    <div v-if="document">
        <h2>{{ document.title }}</h2>
    </div>
    
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import getDocument from '@/composables/getDocument';

export default {
    props: ['id'],
    
    setup(props) {
        const {error, document} = getDocument("playLists", props.id);

        return {document};
    }
}
</script>
<style scoped>

</style>