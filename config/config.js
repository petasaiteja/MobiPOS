import {initializeApp} from 'firebase/app'
import {getDatabase, push, set, ref, onValue} from 'firebase/database'

const cred = {
    apiKey: "AIzaSyAbswF7Tz5SmMvHcFwMOxY-fFDn0D2AFM8",
    authDomain: "pointofsale-b2b46.firebaseapp.com",
    databaseURL: "https://pointofsale-b2b46-default-rtdb.firebaseio.com",
    projectId: "pointofsale-b2b46",
    storageBucket: "pointofsale-b2b46.appspot.com",
    messagingSenderId: "919400140741",
    appId: "1:919400140741:web:d4453b409e716fc17ac5ac",
    measurementId: "G-8BY8H34M17"
}

const app = initializeApp(cred)
const db = getDatabase(app)
const prodRef = ref(db, 'products')
const inventoryRef = ref(db, 'inventory')
const salesRef = ref(db, 'sales')
const getProdRef = id => ref(db, `products/${id}`)

export default {
    getProdRef,
    inventoryRef,
    onValue,
    push,
    prodRef,
    salesRef,
    set
}