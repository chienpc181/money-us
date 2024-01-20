import { ref, watchEffect } from 'vue'
import { projectFirestore } from '../firebase/config'
import { onSnapshot, orderBy, query, collection } from 'firebase/firestore'

const getCollection = (col) => {

  const documents = ref(null)
  const error = ref(null)

  // // register the firestore collection reference
  // let collectionRef = projectFirestore.collection(collection)
  //   .orderBy('createdAt')

  // const unsub = collectionRef.onSnapshot(snap => {
  //   let results = []
  //   snap.docs.forEach(doc => {
  //     // must wait for the server to create the timestamp & send it back
  //     doc.data().createdAt && results.push({...doc.data(), id: doc.id})
  //   });
    
  //   // update values
  //   documents.value = results
  //   error.value = null
  // }, err => {
  //   console.log(err.message)
  //   documents.value = null
  //   error.value = 'could not fetch the data'
  // })

  // const q = query(collection(projectFirestore, col), orderBy('createdAt'));
  const unsub = onSnapshot(collection(projectFirestore, col), (querySnapShot) => {
      let results = [];
      querySnapShot.forEach(doc => {
        // must wait for the server to create the timestamp & send it back
        // doc.data().createdAt && results.push({...doc.data(), id: doc.id});
        results.push({...doc.data(), id: doc.id});
        // console.log(doc.data())
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