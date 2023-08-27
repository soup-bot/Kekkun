<script setup>
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
const userUID = ref("");
const showForm = ref("false");

const recipeName = ref("");
const ingredients = ref("");
const instructions = ref("");
const imageFile = ref(null);


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
  <body>
    <div class="wrapper">
      <h1>MY RECIPES</h1>
      <button @click="showForm=true" >Add recipe</button></div>
<div v-if="showForm" class="form">
<img class="close-btn" @click="showForm=false" src="../images/close.svg" alt="">
<input placeholder="RECIPE NAME" v-model ="recipeName" type="text">
<input placeholder="INGREDIENTS" v-model ="ingredients" type="text">
<input placeholder="INSTRUCTIONS" v-model ="instructions" type="text">
<input type="file" accept="image/*" @change="handleImageUpload">
<button @click="submitRecipe" class="submit">SUBMIT</button>
</div>

</body>

</template>
<style scoped>
body{
  display: flex;
  align-items: center;
  justify-content: center;
}
.wrapper{
  padding-top: 50px;
  width: 80%;
  height: 100vh;
}
.form{
  padding: 50px;
  background-color: aquamarine;
  position: absolute;
  display: flex;
  flex-direction: column;
}
.close-btn{
  width: 15px;
  align-self: flex-end;
  margin-bottom: 50px;
}
</style>