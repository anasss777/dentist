// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; // for authentication
import 'firebase/compat/firestore'; // for cloud firestore
import 'firebase/compat/storage'; // for cloud storage
import 'firebase/compat/analytics'; // for analytics
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAEZkHyWabHr2UYrnHLkHy3cdyYbUluuRk",
    authDomain: "demoproject7777777.firebaseapp.com",
    projectId: "demoproject7777777",
    storageBucket: "demoproject7777777.appspot.com",
    messagingSenderId: "747181570815",
    appId: "1:747181570815:web:fae9e60df74ca2504d2aca",
    measurementId: "G-NN42GJ5FSJ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;