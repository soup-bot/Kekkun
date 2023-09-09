import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyDp2KaA_aIP3tizSoe3WBOVtxy-_FrqCxY",
  authDomain: "kekkun-da721.firebaseapp.com",
  projectId: "kekkun-da721",
  storageBucket: "kekkun-da721.appspot.com",
  messagingSenderId: "62184803239",
  appId: "1:62184803239:web:eec1bff791c6ce1f96c482",
  measurementId: "G-MNC6TFWK8T"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const vueApp = createApp(App)
vueApp.use(router)

vueApp.mount('#app')
