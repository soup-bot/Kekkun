<script setup>
import {RouterLink, useRouter} from "vue-router"
import {onMounted, ref} from "vue";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, onAuthStateChanged
} from "firebase/auth";

const email = ref("");
const password = ref("");
const errMsg = ref();
const router = useRouter();
const isLoggedIn = ref(false);


// onMounted(() => {
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       isLoggedIn.value = true;
//       if (router.currentRoute.value.path === "/login") {
//         router.push("/"); // Redirect to the home page or a different route
//       }
//     } else {
//       isLoggedIn.value = false;
//     }
//   });

// });
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
  signInWithPopup(getAuth(), provider)
  .then((result)=>{
    console.log(result.user);
    router.push("/");
  })
  .catch((error)=>{
    console.log("ERROR");
  });
};

// const signInWithGoogle = () => {
//   const provider = new GoogleAuthProvider();
//   signInWithRedirect(auth, provider)
//   router.push("/");
  
// }
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
<h1>Create an Account</h1>
<p><input type="text" placeholder="Email" v-model ="email"></p>
<p><input type="password" placeholder="Password" v-model ="password"></p>
<p v-if="errMsg">{{ errMsg }}</p>
<p><button @click="register">Register</button></p>
<p><button @click="login">Login</button></p>
<p><button @click="signInWithGoogle">Sign in With Google</button></p>
</div>

</body>
</template>

<style scoped>
body{
  display: flex;
  justify-content: center;
  overflow-y: hidden;
}
.container{
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>