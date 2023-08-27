<script setup>
import {RouterLink} from "vue-router"
import {onMounted, ref} from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import router from "../router";
const isLoggedIn = ref(false);
const userUID = ref(null);
let auth;

//check if user is logged in: to later hide/show login button and myrecipes button
onMounted(()=> {
  auth = getAuth();
  onAuthStateChanged(auth, (user) =>{
if (user){
  isLoggedIn.value = true;
 userUID.value = user.uid;
} else{
  isLoggedIn.value = false;
 
}
  });
});

//logout of account function
const logout = () => {
signOut(auth).then(()=>{
  router.push("/");
});
};
</script>

<template>
  <div class="nav">
<router-link to="/"><img src="../images/logo.png" class="logo"/></router-link>
<!-- <div class="links">
<router-link active-class="active" to="/">Home</router-link>
<router-link active-class="active" to="/about">About</router-link>
<router-link active-class="active" to="/recipes">Recipes</router-link>
<router-link active-class="active" to="/myrecipes" v-if="isLoggedIn">My Recipes</router-link>
</div> -->

<ul class="nav-menu">
  <li class="nav-item"><router-link class="nav-link" active-class="active" to="/">Home</router-link></li>
  <li class="nav-item"><router-link  class="nav-link" active-class="active" to="/about">About</router-link></li>
  <li class="nav-item"><router-link class="nav-link" active-class="active" to="/recipes">Recipes</router-link></li>
  <li class="nav-item"><router-link class="nav-link" active-class="active" to="/myrecipes" v-if="isLoggedIn">My Recipes</router-link></li>
</ul>




<router-link class="login-btn" active-class="active" to="/login" v-if="!isLoggedIn"><img class="login-icon" src="../images/login.svg" alt=""></router-link>

<button class="login-btn" @click="logout" v-if="isLoggedIn"><img class="login-icon" src="../images/logout.svg" alt=""></button>
</div>
</template>

<style scoped>


li{
  list-style: none;

}
li a {
  text-decoration: none;
}
.nav-menu{
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
}


/* NAV BAR ELEMENTS */
.logo{
  width: 130px;
}
.nav{
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
a{
  text-decoration: none;
  color: black;
  font-size: 18px;
  padding: 20px;
}

/* NAV BAR BUTTONS */

.login-btn{
  border: none;
  background-color: transparent;
}
.login-icon{
  width: 30px;
  transition: all 0.15s;
}
.login-icon:hover{
  filter: invert(77%) sepia(46%) saturate(443%) hue-rotate(24deg) brightness(102%) contrast(84%);
}

.active{
  color: #C6D567;
}

</style>