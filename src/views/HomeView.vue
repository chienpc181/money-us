<template>
  <div>
    this is my home page
  </div>
  <div class="error">
    {{ error }}
  </div>
  <div v-for="playList in documents" :key="playList.id">
    <p>{{ playList.title }}</p>
  </div>
</template>

<script>
import getCollection from '@/composables/getCollection';


export default {
  // name: 'Home',
  setup() {
    const {error, documents} = getCollection("playLists");
    
    console.log(documents.value);

    return {error, documents}
  }
}
</script>
