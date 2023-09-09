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
  <div v-if="recipe">
    <h1>{{ recipe.title }}</h1>
    <img :src="recipe.imageUrl" alt="Recipe Image" class="recipe-image">
    <p>{{ recipe.ingredients }}</p>
    <p>{{ recipe.instructions }}</p>
    <!-- Add more details as needed -->
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

