import firebase from 'firebase/app';
import 'firebase/storage';

const config = {
  apiKey: 'AIzaSyDqB7U0El-aq0XSUIoVkGex7zadWz6HZIM',
  authDomain: 'shop-app-d85d3.firebaseapp.com',
  databaseURL: 'https://shop-app-d85d3.firebaseio.com',
  projectId: 'shop-app-d85d3',
  storageBucket: 'shop-app-d85d3.appspot.com',
  messagingSenderId: '910074333174',
  appId: '1:910074333174:web:f9abfd96873b0db1'
};

const init = () => firebase.initializeApp(config);

const firebaseAuth = firebase.auth;
const firebaseStore = firebase.storage;

export { init, firebaseAuth, firebaseStore };
