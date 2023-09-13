<script setup>
import { onMounted, ref, watch} from "vue";
import { getFirestore, query, collection, addDoc, where, onSnapshot } from "firebase/firestore";
import { useRoute, RouterLink } from 'vue-router';
import { getAuth } from 'firebase/auth';

const auth = getAuth();
const user = auth.currentUser;
const db = getFirestore();
const recipes = ref([]);
const drecipes = ref([]);
const searchQuery = ref("");
const recipesCollection = collection(db, 'recipes');
const recipesQuery = query(recipesCollection);
const allRecipes = ref([]);

const fetchAllRecipes = () => {
  onSnapshot(recipesQuery, (snapshot) => {
    const recipeData = [];
    snapshot.forEach((doc) => {
      recipeData.push({ id: doc.id, ...doc.data() });
    });
    allRecipes.value = recipeData;
    filterRecipes();
  });
};

// Function to filter recipes based on search query
const filterRecipes = () => {
  if (searchQuery.value === "") {
    recipes.value = allRecipes.value; // Reset to all recipes when the search query is empty
  } else {
    const filteredRecipes = allRecipes.value.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
    recipes.value = filteredRecipes;
  }
};

onMounted(async () => {
  fetchAllRecipes();
});

watch(searchQuery, () => {
  filterRecipes();
});

const resetQuery = () => {
  searchQuery.value = "";
}
</script>


<template>
  <body>
<div class="search-container">
  <h4>What are you looking for?</h4>
 
  <div class="search-bar-container">
  <input
  class="search-bar"
    v-model="searchQuery"
    type="text"
    placeholder="Search for recipes..."
    @input="search"
  />
<img @click="resetQuery" class="search-x" src="..//images/close.svg" alt="">
</div>
</div>
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

.search-x {
  width: 15px;
  position: absolute;
  bottom: 26px;
  right: 12px;
  cursor: pointer;
  transition: all 0.2s;
}
.search-x:hover{
  scale: 1.1;
}
.search-bar-container{
 position: relative;
 width: 60%;
}
.search-container{
 background-image: url(..//assets/bg.jpg);
 background-repeat: no-repeat;
 background-position: center;
 background-size: cover;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
 

}
h4{
  font-weight: bold;
  text-shadow: 1px 1px 3px black;
  color: white;
  font-size: 23px;
  margin: 19px 10px;
}
.search-bar{
  padding: 10px 8px;
  min-width: 100%;
  margin-bottom: 19px;
  border-radius: 10px;
  border: none;
  transition: all 0.2s;
}
.search-bar:focus{
  outline: none;
}


body{
  display: flex;
  flex-direction: column;
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
  margin-bottom: 30px;
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
.img-container{
  height: 50px;
  overflow: hidden;
}
.card-img{
  max-width: 100%;
  object-fit: fill;
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

@media only screen and (max-width: 768px) {

  .card-container{
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }
.search-x{
  bottom: 26px;
  right: 9px;
}

.card-container{
  display: flex;
  gap: 20px;
  margin-top: 10px;
  padding-bottom: 50px;
}
}
/* recipe cards end */
</style>