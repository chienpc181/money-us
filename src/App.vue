<template>
  <div class="content">
    <Navbar/>
    <router-view/>
  </div>
</template>
<script>
import Navbar from './components/Navbar.vue';
export default {
  components: {Navbar}
}
</script>

<style>

.content{
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 16px;
}
</style>
