<script setup>
import {RouterLink, useRouter} from "vue-router"
import {onMounted, ref} from "vue";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, onAuthStateChanged
} from "firebase/auth";

const auth = getAuth();
const email = ref("");
const password = ref("");
const errMsg = ref();
const router = useRouter();
const isLoggedIn = ref(false);
const registerbox = ref(true);
const loginbox = ref(false);


onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
      if (router.currentRoute.value.path === "/login") {
        router.push("/"); // Redirect to the home page or a different route
      }
    } else {
      isLoggedIn.value = false;
    }
  });
  var user = auth.currentUser;
});


const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
  .then((data)=> {
    console.log("Succesfully registered!");
    router.push('/');
  })
  .catch((error)=>{
    console.log(error.code);
    alert(error.message);
  })
};

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithRedirect(auth, provider)
  
}
const login =() => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
  .then((data)=> {
    console.log("Succesfully signed in");
    router.push('/');
  })
  .catch((error)=>{
    console.log(error.code);
    switch(error.code){
      case "auth/invalid-email":
        errMsg.value = "Invalid email";
        break;
      case "auth/user-not-found":
        errMsg.value = "No account with that email was found";
        break;
      case "auth/wrong-password":
        errMsg.value = "Incorrect password";
        break;
      default:
        errMsg.value ="Email or password was incorrect";
        break;
    }
  })
};
</script>


<template>
  <body>
    <div class="container">
      <div class="toggle"><button v-bind:class="{
    'toggleenabled': registerbox,
    
  }" @click="registerbox=true,loginbox=false">Register</button><button  v-bind:class="{
    'toggleenabled': loginbox,
    
  }" @click="registerbox=false,loginbox=true">Login</button></div>
      
<p><input type="text" placeholder="Email" v-model ="email"></p>
<p><input type="password" placeholder="Password" v-model ="password"></p>
<p v-if="errMsg">{{ errMsg }}</p>
<p><button class="loginbtn" v-if="registerbox" @click="register">Register</button></p>
<p><button class="loginbtn" v-if="loginbox" @click="login">Login</button></p>
<p><button class="google-btn" @click="signInWithGoogle"><img class="google" src="../images/google.svg" alt=""> Sign in With Google</button></p>
</div>

</body>
</template>

<style scoped>
body{
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: hidden;
  height: 100vh;
}
.container{
  border: 1px solid black;
  margin-top: 20px;
  padding: 40px;
  max-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: visible;
}
.toggle button{
  background-color: transparent;
  border: none;
  padding: 10px;
  font-weight: bold;
  transition: all 0.2s;

}
.toggle{
  margin-bottom: 20px;
}
.toggleenabled{
  color: #C6D567;
}
input{
  margin: 5px;
  width: 300px;
  padding: 10px;
}
.loginbtn{
  padding: 8px 12px;
  margin: 9px 0;
}
.google{
  width: 20px;
  padding-right: 8px;
}
.google-btn{
  margin-top: 9px;
display: flex;
padding: 8px;
align-items: center;
justify-content: center;
}

</style>