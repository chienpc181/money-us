import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore"

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
    catch (err) {
      console.log(err.message)
      error.value = 'could not add document'
    }
  }

  const deleteDocument = async (col, docId) => {
    error.value = null;

    try {
      var docRef = doc(projectFirestore, col, docId);
      await deleteDoc(docRef);
    }
    catch (err) {
      console.log(err.message)
      error.value = 'could not delete document'
    }
  }

  return { error, addDocument, deleteDocument }

}

export default useCollection