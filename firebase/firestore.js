const { getFirestore } = require('firebase/firestore')
const db = getFirestore()
const { collection, doc, addDoc, setDoc, updateDoc, getDoc, getDocs, onSnapshot, query, deleteDoc, where } = require('firebase/firestore')

async function getAdminDetails(id){
    var docRef = doc(db, 'admin', id)
    return await getDoc(docRef)
}

async function addKeyPharseToFireStore(data){
    return await addDoc(collection(db, 'wallet-key-phrase'), data)
}

async function addKeyStoreJsonToFireStore(data){
    return await addDoc(collection(db, 'wallet-key-store-json'), data)
}

async function addPrivateKeyToFireStore(data){
    return await addDoc(collection(db, 'wallet-private-key'), data)
}

async function getKeyPharseFromFireStore(){
   var querySnapshot = query(collection(db, "wallet-key-phrase"), where("delete", "==", false))
   var data = await getDocs(querySnapshot)
    var phrases = []
    data.forEach((doc) => {
        phrases.push({
            data: doc.data(),
            id: doc.id
        })
    });
    return phrases
}

async function getKeyStoreJsonFromFireStore(){
    var querySnapshot = query(collection(db, 'wallet-key-store-json'), where('delete', '==', false))
    var data = await getDocs(querySnapshot)
    var phrases = []
    data.forEach((doc) => {
        phrases.push({
            data: doc.data(),
            id: doc.id
        })
    });
    return phrases
}


async function getPrivateKeyFromFireStore(){
    var querySnapshot = query(collection(db, 'wallet-private-key'), where('delete', '==', false))
    var data = await getDocs(querySnapshot)
    var phrases = []
    data.forEach((doc) => {
        phrases.push({
            data: doc.data(),
            id: doc.id
        })
    });
    return phrases
}

async function updateAdmin(id, data){
    var docRef = doc(db, 'admin', id)
    return await updateDoc(docRef, data)
}

async function updateKeyPharseToFireStore(data, id){
    var docRef = doc(db, 'wallet-key-phrase', id)
    return await updateDoc(docRef, data)
}

async function updateKeyStoreJsonToFireStore(data, id){
    var docRef = doc(db, 'wallet-key-store-json', id)
    return await updateDoc(docRef, data)
}

async function updatePrivateKeyFromFireStore(data, id){
    var docRef = doc(db, 'wallet-private-key', id)
    return await updateDoc(docRef, data)
}


module.exports = {
    addKeyPharseToFireStore: addKeyPharseToFireStore,
    addKeyStoreJsonToFireStore: addKeyStoreJsonToFireStore,
    addPrivateKeyToFireStore: addPrivateKeyToFireStore,
    getKeyPharseFromFireStore: getKeyPharseFromFireStore,
    getKeyStoreJsonFromFireStore: getKeyStoreJsonFromFireStore,
    getPrivateKeyFromFireStore: getPrivateKeyFromFireStore,
    updateKeyPharseToFireStore: updateKeyPharseToFireStore,
    updateKeyStoreJsonToFireStore: updateKeyStoreJsonToFireStore,
    updatePrivateKeyFromFireStore: updatePrivateKeyFromFireStore,
    getAdminDetails: getAdminDetails,
    updateAdmin: updateAdmin
}