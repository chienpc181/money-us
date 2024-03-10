<template>

    <div v-for="playList in playLists" :key="playList.id">
        <router-link :to="{name: 'playlist-details', params: {id: playList.id}}">
            <div class="single">
                <div class="thumbnail">
                    <img :src="playList.url" alt="missing image">
                </div>
                <div class="info">
                    <h3>{{ playList.title }}</h3>
                    <p>{{ playList.description }}</p>
                </div>
            </div>
        </router-link>
    </div>
    <!-- <DataTable :value="playLists" tableStyle="min-width: 50rem">
        <Column field="title" header="Title"></Column>
        <Column field="description" header="Description"></Column>
    </DataTable> -->
</template>

<script>

export default {
    props: ['playLists', 'error'],
    setup() {

    }
}
</script>
<style scoped>
    /* .single {
        display: flex;
        align-items: center;
        padding: 20px;
        border-radius: 10px;
        background: white;
        margin: 16px 0;
        transition: all ease 0.2s;
    }
    .single:hover {
        box-shadow: 1px 2px 3px rgba(50,50,50,0.05);
        transform: scale(1.02);
        transition: all ease 0.2s;
    }
    .thumbnail {
        max-width: 100px;
        max-height: 100px;
        overflow: hidden;
        border-radius: 10px;
    }
    img {
        max-width: 150%;
        max-height: 150%;
        display: block;
    }
    .info {
        margin: 0 30px;
    }
    .song-number {
        margin-left: auto;
    } */
</style>