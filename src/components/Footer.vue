<script setup>
import {RouterLink} from "vue-router"
import router from "../router";
import {onMounted, ref} from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const userUID = ref ("")
const isLoggedIn = ref(false);
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
  <div class="footer-section">
<div class="footer-container">
<div class="footersec1 section"><div class="sec1 title">About us</div> 
<div class="sec2-description text">Discover, Create, and Share Culinary Delights with Our Community of Food Enthusiasts. Explore a World of Flavorful Inspiration, Craft Your Signature Dishes, and Connect with Fellow Food Lovers on Our Homegrown Recipe Hub.</div></div>
<div class="footersec2 section">
  <div class="sec2 title">Browse</div>
  <div class="sec2-list-container">
    <ul>
  <li class="nav-item"><router-link class="nav-link" active-class="active" to="/">Home</router-link></li>
  <li class="nav-item"><router-link class="nav-link" active-class="active" to="/about">About</router-link></li>
  <li class="nav-item"><router-link class="nav-link" active-class="active" to="/recipes">Recipes</router-link></li>
  <li class="nav-item"><router-link class="nav-link" active-class="active" to="/myrecipes" v-if="isLoggedIn">My Recipes</router-link></li>
  <li><router-link class="nav-link" active-class="active" to="/login" v-if="!isLoggedIn">Login/Register</router-link></li>
  <li><div class="nav-link logout" @click="logout();" v-if="isLoggedIn">Logout</div></li>
</ul>
  </div>
</div>
<div class="footersec3 section">
<div class="sec3 title">Contact us</div>
<div class="sec3-description text">kekkunmv@gmail.com</div>

</div>
</div>
<div class="below-footer">
  <div class="copyright"><div>Copyright © 2023</div>
    <a href="https://storyset.com/people">People illustrations by Storyset</a></div>
</div>
  </div>
</template>
<style scoped>

.footer-section{
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #191919;
opacity: 1;
background-image: radial-gradient(#292929 0.9px, #0f0f0f 0.9px);
background-size: 18px 18px;
}
.section{
  max-width: 30ch;
}
.footer-container{
  width: 100ch;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 40px 10px;
}
.title{
  color: whitesmoke;
  font-weight: bold;
  margin-bottom: 15px;

}
.text{
  color: rgba(245, 245, 245, 0.503);
  font-size: 13px;
}

.logout{
cursor: pointer;
color: whitesmoke;
font-size: 13px;
}




ul li {
  padding: 5px 0;
  list-style: none;
}
ul li a {
  text-decoration: none;
  color: whitesmoke;
  font-size: 13px;
}
.below-footer{
  padding: 20px;
  background-color: rgb(0, 0, 0);
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.copyright{
  color: rgba(255, 255, 255, 0.452);
  font-weight: bold;
  font-size: 13px;
}
.below-footer a {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.452);
}

@media only screen and (max-width: 768px) {
.footer-container{
  width: 100vw;
  flex-direction: column;
}
.title{
  margin-top: 10px;
}
ul li{
  padding: 10px 0;
}
.section{
  padding: 10px 15px;
}
  
}

</style>