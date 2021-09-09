import firebase from 'firebase/app';
import 'firebase/storage';

const config = {
  apiKey: "AIzaSyDW7q9Ow0S8K5a8ckEjHUEU_c5ZAAaJJXw",
  authDomain: "liapp-d6810.firebaseapp.com",
  databaseURL: "https://liapp-d6810.firebaseio.com",
  projectId: "liapp-d6810",
  storageBucket: "liapp-d6810.appspot.com",
  messagingSenderId: "64381066729",
  appId: "1:64381066729:web:8636e09940425bddf87f78",
  measurementId: "G-JD6PPDCGQD"
};

const init = () => firebase.initializeApp(config);

const firebaseAuth = firebase.auth;
const firebaseStore = firebase.storage;

export { init, firebaseAuth, firebaseStore };
