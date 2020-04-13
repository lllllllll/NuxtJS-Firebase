import firebase from "firebase/app";
import "firebase/firestore";
const config = {}
const firebaseApp = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

const db = firebaseApp.firestore();

export { db };
