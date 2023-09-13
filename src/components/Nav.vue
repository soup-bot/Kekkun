<script setup>
import {RouterLink} from "vue-router"
import {onMounted, ref} from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import router from "../router";

const isLoggedIn = ref(false);
const userUID = ref(null);
let auth;
const showMobileMenu = ref (false);

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

<img class="hamburger" src="../images/hamburger.svg" alt="" @click="showMobileMenu = !showMobileMenu">
 <div :class="{ active: showMobileMenu }" class="nav-menu">
<ul>
  <li class="nav-item"><router-link @click="showMobileMenu = !showMobileMenu" class="nav-link" active-class="active" to="/">Home</router-link></li>
  <li class="nav-item"><router-link @click="showMobileMenu = !showMobileMenu" class="nav-link" active-class="active" to="/about">About</router-link></li>
  <li class="nav-item"><router-link @click="showMobileMenu = !showMobileMenu" class="nav-link" active-class="active" to="/recipes">Recipes</router-link></li>
  <li class="nav-item"><router-link @click="showMobileMenu = !showMobileMenu" class="nav-link" active-class="active" to="/myrecipes" v-if="isLoggedIn">My Recipes</router-link></li>
  <li><router-link class="login-btn" @click="showMobileMenu = !showMobileMenu" active-class="active" to="/login" v-if="!isLoggedIn"><img class="login-icon" src="../images/login.svg" alt=""></router-link></li>
  <li><button class="login-btn" @click="logout(); showMobileMenu = !showMobileMenu" v-if="isLoggedIn"><img class="login-icon" src="../images/logout.svg" alt=""></button></li>
</ul>
</div>

</div>
</template>

<style scoped>


li{
  list-style: none;
  transition: all 0.2s;

}
li a {
  text-decoration: none;
}
.nav-menu{
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  transition: all 1.2s;
}
.nav-menu ul{
  display: flex;
  gap: 30px;
  align-items: center;
}


/* NAV BAR ELEMENTS */
.logo{
  width: 130px;
}
.nav{
  background-color: rgb(255, 255, 255);
  padding: 3px 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 2;
  box-shadow: 1px 1px 12px rgba(0, 0, 0, 0.101);
}
a{
  text-decoration: none;
  color: rgb(0, 0, 0);
  font-size: 18px;
  padding: 20px;
}

/* NAV BAR BUTTONS */

.login-btn{
  border: none;
  background-color: transparent;
  filter: invert(77%) sepia(46%) saturate(443%) hue-rotate(24deg) brightness(102%) contrast(84%);
  transition: all 0.3s;
  
}
.login-icon{
  width: 30px;
  transition: all 0.15s;
}
.login-icon:hover{
  scale: 1.3;
}
.nav-menu li:hover{
  scale: 1.1;
}
.active{
  color: #C6D567;
}

.hamburger{
  position: absolute;
  top: 2.2rem;
  right: 1.5rem; 
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 26px;
  overflow: visible;
  display: none;
  
}
.bar{
border-radius: 5px;
width: 100%;
height: 4px;
background-color: black;
}


@media only screen and (max-width: 768px) {

  .nav{
    display: flex;
    align-items: flex-start;
    flex-direction: column;
  }
  .nav-menu{
    width: 100%;
    display: none; 
    margin: 0;
  }
  .nav-menu ul {
    display: flex;
    
    flex-direction: column;
    width: 100%;
  }
  .nav-menu li a {
    text-align: center;
    width: 100%;
    padding: 0;
  }
  .hamburger{
    display: block;
  }
  .nav-menu.active{
   display: flex;
   text-align: center;
  }
}
</style>