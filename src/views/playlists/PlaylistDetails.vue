<template>
    <div v-if="playlist" class="playlist-details">
        <div class="playlist-info">
            <div class="cover">
                <img :src="playlist.url" alt="missing img">
            </div>
            <h2>{{ playlist.title }}</h2>
            <p class="username">Created by {{ playlist.userName }}</p>
            <p class="description">{{ playlist.description }}</p>
        </div>
        <div class="song-list">
            <AddSongModal/>
            <ListSongs :songs="songs"/>
        </div>
        
        <!-- <ConfirmationDialog  :action="deleteSong.action" :message="deleteSong.message" :title="deleteSong.title" :onConfirm="deleteSong.onConfirm"/> -->
    </div>
    
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import getDocument from '@/composables/getDocument';
import ConfirmationDialog from '@/components/ConfirmationDialog.vue';
import AddSongModal from '@/components/AddSongModal.vue';
import getCollection from '@/composables/getCollectionWithQuery';
import ListSongs from '@/components/ListSongs.vue';
import getUser from '@/composables/getUser';

export default {
    props: ['id'],
    components: {
        ConfirmationDialog,
        AddSongModal,
        ListSongs
    },
    setup(props) {
       
        const {error, document: playlist} = getDocument("playLists", props.id);
        const {user} = getUser();

        const querySongs = [];
        querySongs.push({
            field: "playListId",
            operator: "==",
            value: props.id
        })
        querySongs.push({
            field: "userId",
            operator: "==",
            value: user.value.uid
        })
        
        const {error: errorLoadSongs, documents: songs} = getCollection("mySongs", querySongs, []);
        
        const deleteSong = ref({
            action: "Delete",
            title: "Delete song",
            message: "Are you sure you want to delete?",
            onConfirm: () => {
                
            }
        })

        return {playlist, deleteSong, songs};
    }
}
</script>
<style scoped>
    .playlist-details {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 80px;
    }
    .cover {
        overflow: hidden;
        border-radius: 20px;
        position: relative;
        padding: 160px;
    }
    .cover img {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        max-width: 150%;
        max-height: 150%;
        min-width: 100%;
        min-height: 100%;
    }
    .playlist-info {
        text-align: center;
    }
</style>