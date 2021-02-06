
import * as firebase from 'firebase'
import 'firebase/firestore';
// import { exp } from 'react-native/Libraries/Animated/src/Easing';







var firebaseConfig = {
    apiKey: "AIzaSyCMtZsUAg4pOPhzwJZeAnno1aBHZVGyoZU",
    authDomain: "blooddonationapp-1d219.firebaseapp.com",
    projectId: "blooddonationapp-1d219",
    storageBucket: "blooddonationapp-1d219.appspot.com",
    messagingSenderId: "117053512110",
    appId: "1:117053512110:web:07deabdf086e948fdcd03f",
    measurementId: "G-DGMSLTRT83"
  };
  firebase.initializeApp(firebaseConfig);


function registerUser(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)

}

function LoginUser(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
}



    


export {
    registerUser,LoginUser,firebase
}