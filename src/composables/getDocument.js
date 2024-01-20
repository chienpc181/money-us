import { ref, watchEffect } from 'vue'
import { projectFirestore } from '../firebase/config'
import { onSnapshot, orderBy, query, collection, doc } from 'firebase/firestore'

const getDocument = (col, id) => {

  const document = ref(null)
  const error = ref(null)

//   const q = query(collection(projectFirestore, col), orderBy('createdAt'));
//   const unsub = onSnapshot(collection(projectFirestore, col).doc(id), (querySnapShot) => {
//       let results = [];
//       querySnapShot.forEach(doc => {
//         doc.data().createdAt && results.push({...doc.data(), id: doc.id});
//       });
      
//       // update values
//       documents.value = {...doc.data()}
//       error.value = null
//     }, err => {
//       console.log(err.message)
//       documents.value = null
//       error.value = 'could not fetch the data'
//   })

    const unsub = onSnapshot(doc(projectFirestore, col, id), (doc) => {
        if (doc.data()) {
            document.value = {...doc.data(), id: doc.id};
            error.value = null;
        } else {
            document.value = null;
            error.value = "could not get the document";
        }
    })

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return { error, document }
}

export default getDocument