<!-- RecipeDetails.vue -->
<script setup>
import { ref, onMounted, computed } from 'vue';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useRoute } from 'vue-router';

const route = useRoute();
const db = getFirestore();
const recipes = ref([]);
const recipe = ref(null);
const recipeId = computed(() => route.params.id);

  onMounted(async () => {
  // Create a reference to the recipe document using the route parameter
  const recipeRef = doc(db, 'recipes', recipeId.value);
  console.log('recipe id: '+ recipeId.value);

  try {
    // Fetch the specific recipe document based on the route parameter
    const recipeDoc = await getDoc(recipeRef);

    if (recipeDoc.exists()) {
      // If the recipe document exists, set the recipe ref with its data
      recipe.value = { id: recipeDoc.id, ...recipeDoc.data() };
      console.log("RECIPE FOUND");
    } else {
      // Handle the case where the recipe document doesn't exist
      console.log('Recipe not found.');
    }
  } catch (error) {
    // Handle any errors that may occur during the fetch
    console.error('Error fetching recipe:', error);
  }
});


</script>

<template>
  <body>
 <div class="wrapper">
  <div v-if="recipe">
    <!-- <h1>{{ recipe.title }}</h1>
    <img :src="recipe.imageUrl" alt="Recipe Image" class="recipe-image">
    <p>{{ recipe.ingredients }}</p>
    <p>{{ recipe.instructions }}</p> -->
    <!-- Add more details as needed -->
    <div>
    <h1 class="recipe-title" >{{ recipe.title }}</h1>
    <div class="imgingredients">
    <img class="recipe-img" :src="recipe.imageUrl" alt="Recipe Image" />


    <div class="ingredients">
    <h2>Ingredients</h2>
    <ul>
      <li class="ingredients-li" v-for="(ingredient, index) in recipe.ingredients" :key="index">{{ ingredient }}</li>
    </ul>
  </div>
</div>
    <h2>Instructions</h2>
    <ol>
      <li class="instructions-li" v-for="(instruction, index) in recipe.instructions" :key="index">{{ instruction }}</li>
    </ol>
  </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</div>
</body>
</template>

<style scoped>
body{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 100px;

}
.wrapper{
  display: flex;
  max-width: 80%;
  
}
.imgingredients{
  display: flex;
  align-items: center;
  justify-content: center;
}
.recipe-img{
  width: 400px;
  margin: 30px 120px;
}

h2{
  text-align: center;
  font-weight: 500;
  font-size: 20px;
  margin-bottom: 30px;
  margin-top: 30px;

}
.recipe-title{
  text-align: center;
  font-size: 25px;
  font-weight: bold;
  margin: 30px;
}

ul li{
  font-size: 16px;
 margin-bottom: 8px;

}


ol li {
  max-width: 90ch;
  margin-bottom: 8px;

}
@media only screen and (max-width: 768px) {
.imgingredients{
  flex-direction: column;

}
.wrapper{
  max-width: 100%;
}

ol li {
  max-width: 30ch;
  margin-bottom: 8px;
  margin: 30px;

}

.recipe-img{
  width: 300px;
  margin: 30px;
}

}

</style>

