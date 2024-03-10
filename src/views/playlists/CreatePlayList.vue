<template>
    <form @submit.prevent="handleSubmit">
        <input type="text" placeholder="Playlist title" v-model="title" required>
        <textarea name="" id="" cols="30" rows="5" placeholder="Playlist description..." v-model="description"></textarea>
        <label >Upload image for playlist cover</label>
        <input type="file" @change="handleFileChanged" >
        <div class="error" v-if="fileError">{{ fileError }}</div>
        <div class="btn-submit-form">
            <button type="submit">Create</button>
        </div>
        
    </form>
</template>

<script>
import { ref } from 'vue';
import useStorage from '@/composables/useStorage';
import useCollection from '@/composables/useCollection';
import getUser from '@/composables/getUser';
import router from '@/router';
import { timestamp } from '@/firebase/config';

export default {
    setup() {
        const title = ref('');
        const description = ref('');
        const file = ref(null);
        const fileError = ref(null);
        const {url, filePath, error, uploadFile} = useStorage();
        const {addDocument} = useCollection("testCollections");
        const {user} = getUser();
         
        const handleSubmit = async () => {
            if (file.value) {
                await uploadFile(file.value);
                const docRef = await (addDocument({
                    title: title.value,
                    description: description.value,
                    url: url.value,
                    filePath: filePath.value,
                    userId: user.value.uid,
                    userName: user.value.displayName,
                    createdAt: timestamp()
                }));
                
                router.push({name: "playlist-details", params: {id: docRef.id}} )
            }
            
        }
        const validTypes = ['image/png', 'image/jpeg'];
        const handleFileChanged = (e) => {
            var result = e.target.files[0];
            if (result && validTypes.includes(result.type)) {
                file.value = result;
                fileError.value = null;
            }
            else {
                file.value = null;
                fileError.value = "Please select an image file (png or jpeg)";
            }
        }

        return {title, description, handleSubmit, handleFileChanged, file, fileError}
    }
}
</script>
<style scoped>

</style>