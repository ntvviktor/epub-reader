import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
const firebase_api_key = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const auth_domain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
const project_id = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const storage_bucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
const messaging_sender_id = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID;
const app_id = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;
const firebaseConfig = {
    apiKey: firebase_api_key,
    authDomain: auth_domain,
    projectId: project_id,
    storageBucket: storage_bucket,
    messagingSenderId: messaging_sender_id,
    appId: app_id,
    measurementId: "G-TRHRECTFF7"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const firestore = getFirestore(app);
export const storage = getStorage(app); 