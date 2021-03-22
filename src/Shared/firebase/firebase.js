// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: 'AIzaSyADJRqzlWxHyWoXVB_RnB3IkAdKpeB0_yI',
    authDomain: 'clone-app-e9da4.firebaseapp.com',
    projectId: 'clone-app-e9da4',
    storageBucket: 'clone-app-e9da4.appspot.com',
    messagingSenderId: '240197846632',
    appId: '1:240197846632:web:b15e2e375e6cda5bf09ddd',
    measurementId: 'G-32KCTBTNJJ',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebaseApp.auth();

export { db, auth };
