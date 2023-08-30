import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
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
initializeApp(firebaseConfig);

const app = createApp(App)
app.use(router)

app.mount('#app')
