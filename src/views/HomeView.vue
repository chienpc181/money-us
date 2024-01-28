<template>
  <div>
    My playlists
  </div>
  <ListPlaylists :playLists="documents" :error="error"/>
</template>

<script>
import getCollection from '@/composables/getCollection';
import ListPlaylists from '@/components/ListPlaylists.vue';

export default {
  // name: 'Home',
  components: {
    ListPlaylists
  },
  setup() {
    const {error, documents} = getCollection("playLists");
    
    // console.log(documents.value);

    return {error, documents}
  }
}
</script>
