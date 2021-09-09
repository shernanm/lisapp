import firebase from 'firebase/app';
import 'firebase/database/dist/index.cjs';
import 'firebase/auth';

const provider = new firebase.auth.GoogleAuthProvider();

export default {
  login: () => firebase.auth().signInWithPopup(provider),
  logout: () => firebase.auth().signOut()
};
