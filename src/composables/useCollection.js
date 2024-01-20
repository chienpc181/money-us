import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'
import {addDoc, collection} from "firebase/firestore"

const useCollection = (col) => {

  const error = ref(null);

  // add a new document
  const addDocument = async (doc) => {
    error.value = null;
    
    try {
      // await projectFirestore.collection(collection).add(doc)
      const docRef = await addDoc(collection(projectFirestore, col), doc);
      
      return docRef;
    }
    catch(err) {
      console.log(err.message)
      error.value = 'could not send the message'
    }
  }

  return { error, addDocument }

}

export default useCollection