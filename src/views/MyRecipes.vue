<script setup>
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
const userUID = ref("");

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      userUID.value = user.uid;
      console.log("Your UID: "+userUID.value);
    }
  });
});
</script>


<template>
<h1>MY RECIPES</h1>
</template>