import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRjfvBlcXzN3Qyswe3rBOGghpqIsyHxVU",
  authDomain: "ghi-electronics.firebaseapp.com",
  projectId: "ghi-electronics",
  storageBucket: "ghi-electronics.firebasestorage.app",
  messagingSenderId: "1084951662587",
  appId: "1:1084951662587:web:760f369ecf97dce60b455e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;