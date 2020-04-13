import firebase from "firebase/app";
import "firebase/firestore";
const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STOREAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
}
const firebaseApp = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

const db = firebaseApp.firestore();

export { db };
