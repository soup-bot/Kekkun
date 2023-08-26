<script setup>
import {RouterLink} from "vue-router"
import {onMounted, ref} from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import router from "../router";
const isLoggedIn = ref(false);
const userUID = ref(null);
let auth;
onMounted(()=> {
  auth = getAuth();
  onAuthStateChanged(auth, (user) =>{
if (user){
  isLoggedIn.value = true;
 userUID.value = user.uid;
 console.log(userUID.value);
} else{
  isLoggedIn.value = false;
 
}
  });
});


const logout = () => {
signOut(auth).then(()=>{
  router.push("/");
});
};
</script>

<template>
  <div class="nav">
<router-link active-class="active" to="/">Home</router-link>
<router-link active-class="active" to="/about">About</router-link>
<router-link active-class="active" to="/login" v-if="!isLoggedIn">Login</router-link>
<router-link active-class="active" to="/recipes">Recipes</router-link>
<router-link active-class="active" to="/myrecipes" v-if="isLoggedIn">My Recipes</router-link>
<button @click="logout" v-if="isLoggedIn">Logout</button>
</div>
</template>

<style scoped>
a{
  padding: 10px;
}
</style>