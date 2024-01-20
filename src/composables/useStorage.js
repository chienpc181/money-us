import { getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage";
import { ref } from "vue";
import getUser from "./getUser";
import { projectStorage } from "@/firebase/config";

const {user} = getUser();

const useStorage = () => {
    const error = ref(null);
    const url = ref(null);
    const filePath = ref(null);

    const uploadFile = async (file) => {
        filePath.value = `covers/${user.value.uid}/${file.name}`;
        const storageReference = storageRef(projectStorage, filePath.value);
        try {
            const res = await uploadBytes(storageReference, file);
            url.value = await getDownloadURL(storageReference);
        }
        catch (err) {
            error.value = err.message;
        }
    }

    return {url, filePath, error, uploadFile}
}

export default useStorage