<template>
    <ol class="list-group list-group-numbered">
        <li class="list-group-item d-flex justify-content-between align-items-start" v-for="song in songs" :key="song.id">
            <div class="ms-2 me-auto">
                <div class="fw-bold">{{ song.name }}</div>
                <div>{{ song.lyrics }}</div>
            </div>
            <!-- <span class="badge bg-primary rounded-pill">14</span> -->
            <ConfirmationDialog  :icon="'remove'" :message="deleteSong.message" :title="deleteSong.title" @confirm-action="handleDeleteSong(song.id)"/>
        </li>
    </ol>
</template>

<script>
import ConfirmationDialog from './ConfirmationDialog.vue';
import { ref } from 'vue';
import useCollection from '@/composables/useCollection';
export default {
    props: ['songs'],
    components: {
        ConfirmationDialog
    },
    setup() {
        const {deleteDocument} = useCollection();

        const deleteSong = ref({
            action: "x",
            title: "Delete song",
            message: "Are you sure you want to delete this song?"
        })

        const handleDeleteSong = async (songId) => {
            await deleteDocument("mySongs", songId);
        }

        return { deleteSong, handleDeleteSong}
    }
}
</script>
<style scoped>

</style>