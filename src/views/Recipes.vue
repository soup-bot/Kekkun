<script setup>
import { onMounted, ref } from "vue";
import { getFirestore, query, collection, addDoc, where, onSnapshot } from "firebase/firestore";
import { useRoute, RouterLink } from 'vue-router';
import { getAuth } from 'firebase/auth';

const auth = getAuth();
const user = auth.currentUser;
const db = getFirestore();
const recipes = ref([]);

onMounted(async () => {
  // Fetch all recipes from Firestore
  const recipesCollection = collection(db, 'recipes');
  const recipesQuery = query(recipesCollection);

  onSnapshot(recipesQuery, (snapshot) => {
    const recipeData = [];
    snapshot.forEach((doc) => {
      recipeData.push({ id: doc.id, ...doc.data() });
    });
    recipes.value = recipeData;
  });
});


</script>


<template>
  <body>
    <div class="wrapper">
 
    <div class="card-container">
<div v-for="(recipe, index) in recipes" :key="recipe.id" class="card">
  <div class="img-container">
    <img class="card-img" :src="recipe.imageUrl" alt="">
  </div>
<div class="card-text">
  <div class="card-title bold"> {{ recipe.title }}</div>
  <div class="card-description">{{ recipe.description }}</div>
  <router-link :to="'/recipe/' + recipe.id" class="details-link">View Details</router-link>
</div>
</div>

    </div>
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
 
/* recipe cards */
.card-container{
  display: flex;
  gap: 20px;
  margin-top: 30px;
}
.card{
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.219);
  border-radius: 12px;
 padding: 15px;
 width: 250px;
 height: 320px;
 display: flex;
 flex-direction: column;
 justify-content: flex-start;
text-align: center;

}
.card-img{
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  

}
.card-title{
font-size: 18px;
margin-bottom: 12px;
}
.card-description{
  max-height: 80px; /* Limit text height to prevent overflow */
  overflow: hidden;
  text-overflow: ellipsis; /* Add ellipsis for truncated text */
  white-space: nowrap;
  font-size: 15px;
  margin-bottom: 12px;
}
.img-container{
  height: 90%;
  display: flex;
  margin-bottom: 9px;
  padding: 12px;
  
}


/* recipe cards end */
</style>