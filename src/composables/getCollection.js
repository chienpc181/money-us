import { ref, watchEffect } from 'vue'
import { projectFirestore } from '../firebase/config'
import { onSnapshot, orderBy, query, collection } from 'firebase/firestore'

const getCollection = (col) => {

  const documents = ref(null)
  const error = ref(null)

  const q = query(collection(projectFirestore, col), orderBy('createdAt'));
  const unsub = onSnapshot(q, (querySnapShot) => {
      let results = [];
      querySnapShot.forEach(doc => {
        doc.data().createdAt && results.push({...doc.data(), id: doc.id});
      });
      
      // update values
      documents.value = results
      error.value = null
    }, err => {
      console.log(err.message)
      documents.value = null
      error.value = 'could not fetch the data'
  })

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return { error, documents }
}

export default getCollection