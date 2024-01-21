<template>
  <div>
    My playlists
  </div>
  <ListView :playLists="documents" :error="error"/>
</template>

<script>
import getCollection from '@/composables/getCollection';
import ListView from '@/components/ListView.vue';

export default {
  // name: 'Home',
  components: {
    ListView
  },
  setup() {
    const {error, documents} = getCollection("playLists");
    
    // console.log(documents.value);

    return {error, documents}
  }
}
</script>
