<template>
  <!-- Button trigger modal -->
  <!-- <button type="button" class="btn-submit-form" @click="openModal" data-bs-target="#my-modal">
    Add
  </button> -->
  <div class="action-add-song">
    <font-awesome-icon icon="fa-plus-square" @click="openModal"
      data-bs-target="#my-modal" />
  </div>


  <!-- Modal -->
  <div class="modal fade" id="my-modal" data-bs-backdrop="static" tabindex="-1" aria-labelledby="myModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="myModalLabel">Add new song</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="addNewSong">
            <div class="mb-3">
              <label for="song-name" class="col-form-label">Title</label>
              <input v-model="newSong.name" type="text" class="form-control" id="song-name">
            </div>
            <div class="mb-3">
              <label for="song-by" class="col-form-label">By</label>
              <input v-model="newSong.by" type="text" class="form-control" id="song-by">
            </div>
            <div class="mb-3">
              <label for="message-text" class="col-form-label">Lyrics</label>
              <textarea v-model="newSong.lyrics" class="form-control" id="message-text"></textarea>
            </div>
            <button type="submit" class="btn-submit-form">Add</button>
          </form>
        </div>
        <!-- <div class="modal-footer">
          <button type="button" class="btn-submit-form">Add</button>
        </div> -->
      </div>
    </div>
  </div>
</template>
  
<script>
import { ref } from 'vue';
import { Modal } from 'bootstrap';
import useCollection from '@/composables/useCollection';
import getUser from '@/composables/getUser';
import { timestamp } from '@/firebase/config';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const newSong = ref({
      name: '',
      by: '',
      lyrics: '',
    });

    var myModal = null;
    const { addDocument } = useCollection("mySongs");
    const { user } = getUser();
    const route = useRoute();

    const addNewSong = async () => {

      const docRef = await (addDocument({
        name: newSong.value.name,
        by: newSong.value.by,
        lyrics: newSong.value.lyrics,
        playListId: route.params.id,
        // url: url.value,
        // filePath: filePath.value,
        userId: user.value.uid,
        userName: user.value.displayName,
        createdAt: timestamp()
      }));

      myModal.hide();

    };

    const openModal = () => {
      myModal = new Modal(document.getElementById('my-modal'), {});
      myModal.show();
    }



    return { newSong, addNewSong, openModal };
  },
};
</script>
  
<style scoped>
.btn-close:hover {
  background: var(--bs-btn-close-bg) center/1em auto no-repeat;
  color: var(--bs-btn-close-color);
  ;
}
.action-add-song {
  display: flex;
  justify-content: flex-end;
  
}
.action-add-song svg  {
  height: 30px;
  cursor: pointer;
  padding: 0.2rem;
}
</style>
  