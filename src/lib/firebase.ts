import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
import {getAuth, GoogleAuthProvider} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDp2foCWfJSO0_Y5vsE8-JbOOjT-kWWiec",
    authDomain: "epubjs-42ab4.firebaseapp.com",
    projectId: "epubjs-42ab4",
    storageBucket: "epubjs-42ab4.appspot.com",
    messagingSenderId: "441271527927",
    appId: "1:441271527927:web:af996ab1d2434721c2e6f2",
    measurementId: "G-TRHRECTFF7"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const firestore = getFirestore(app);
export const storage = getStorage(app); 