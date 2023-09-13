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

  background-image: url(../images/loginbg.jpg);
  background-position: center;
  background-size: cover;
}



.container{
  
  /* From https://css.glass */
background: rgba(255, 255, 255, 0.35);
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(15.1px);
-webkit-backdrop-filter: blur(15.1px);
border: 1px solid rgba(255, 255, 255, 0.57);
  margin-top: 20px;
  padding: 40px;
  max-height: 500px;
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
  font-size: 16px;
  font-weight: bold;
  transition: all 0.2s;
  

}
.toggle{
  margin-bottom: 20px;
}
.toggleenabled{
  color: rgb(255, 255, 255);
  scale: 1.3;
  
}
input{
  margin: 12px;
  width: 300px;
  padding: 10px;
  border-radius: 3px;
  border: none;
}
input:focus{
  outline: none;
}
.loginbtn{
  width: 90px;
  margin: 12px 0;
  padding: 8px 0;
  background-color: green;
  color: white;
  font-weight: 500;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s;

}
.loginbtn:hover{
  background-color: rgb(0, 177, 0);
}
.google{
  width: 20px;
  padding-right: 8px;
}
.google-btn{
  cursor: pointer;
  margin-top: 15px;
  background-color: white;
  border: none;
  border-radius: 8px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.164);
display: flex;
padding: 8px;
align-items: center;
justify-content: center;
transition: all 0.3s;
font-weight: 500;
}
.google-btn:hover{
  background-color: rgb(0, 177, 0);
}
@media only screen and (max-width: 768px) {

  body{
align-items: flex-start;
  }

  .container{
  height: 100%;
  width: 100%;
background-color: rgba(236, 236, 236, 0.678);
backdrop-filter: none;
-webkit-backdrop-filter: none;

}

}
</style>