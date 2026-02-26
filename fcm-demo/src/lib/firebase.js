import { initializeApp } from "firebase/app";
import {getMessaging} from "firebase/messaging"

const firebaseConfig = {
  apiKey: "AIzaSyCyT2qcj1j05PXgVgZnwNkKto_FgAR1VFQ",
  authDomain: "test-notification-e6d9a.firebaseapp.com",
  projectId: "test-notification-e6d9a",
  storageBucket: "test-notification-e6d9a.firebasestorage.app",
  messagingSenderId: "352033078609",
  appId: "1:352033078609:web:f023d814431a2afac66770",
  measurementId: "G-ZVX9TXT5R5"
};
const app = initializeApp(firebaseConfig)
export {app}