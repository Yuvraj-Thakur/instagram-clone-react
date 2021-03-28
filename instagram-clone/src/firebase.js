// For Firebase JS SDK v7.20.0 and later, measurementId is optional
  import firebase from "firebase";

  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCY3LwgDSxYvzDXGqJoNV3uc3odbdlsqVg",
    authDomain: "instagram-clone-9e455.firebaseapp.com",
    projectId: "instagram-clone-9e455",
    storageBucket: "instagram-clone-9e455.appspot.com",
    messagingSenderId: "190459965774",
    appId: "1:190459965774:web:d5aff02e09d97548a52e1f",
    measurementId: "G-R75TD7B8PW"
  });
  
  const db =firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export { db, auth, storage};