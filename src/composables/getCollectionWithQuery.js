import { ref, watchEffect } from 'vue'
import { projectFirestore } from '../firebase/config'
import { onSnapshot, orderBy, query, collection, where } from 'firebase/firestore'

const getCollection = (col, queryModels) => {

  const documents = ref(null)
  const error = ref(null)
  
  let q = query(collection(projectFirestore, col));
  queryModels.forEach((queryModel) => {
    q = query(q, where(queryModel.field, queryModel.operator, queryModel.value));
  })
  q = query(q, orderBy('createdAt'));

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