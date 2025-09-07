import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// GHI Electronics Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyBKvGBJVY-9M0lPVz_LDcRn0HBpbE0E2hE",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "ghi-electronics.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "ghi-electronics",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "ghi-electronics.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:1234567890:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;