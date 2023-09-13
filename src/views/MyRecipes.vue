<script setup>
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, query, collection, addDoc, where, onSnapshot, deleteDoc, doc, setDoc } from "firebase/firestore";
import {getStorage, uploadBytes, ref as firebaseRef, getDownloadURL } from "firebase/storage";

const auth = getAuth();
const userUID = ref("");
const showForm = ref(false);
const recipes = ref([]);
const recipeName = ref("");
const description = ref("");
const ingredients = ref([""]);
const instructions = ref([""]);
const db = getFirestore();
const recipeId = ref(null);


const storage = getStorage();
const imageFile = ref(null);


onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      userUID.value = user.uid;
      console.log("Your UID: " + userUID.value);
      
      // Now that you have the user's UID, you can create the query
      const recipesCollection = collection(db, 'recipes');
      const userRecipesQuery = query(
        recipesCollection,
        where('userId', '==', userUID.value)
      );

      const unsubscribe = onSnapshot(userRecipesQuery, (querySnapshot) => {
        const recipeData = [];
        querySnapshot.forEach((doc) => {
          recipeData.push(doc.data());
        });
        recipes.value = recipeData;
      });

      return unsubscribe;
    }
  });
});


const handleImageUpload = async (event) => {
  const storageRef = firebaseRef(
    storage,
    `recipeImages/${userUID.value}_${new Date().getTime()}.jpg`
  );
  const file = event.target.files[0]; // This should be the selected image file
  try {
    await uploadBytes(storageRef, file);
    const imageUrl = await getDownloadURL(storageRef);
    console.log("Image uploaded successfully!");
    // Store the imageUrl in a variable to associate it with the recipe
    imageFile.value = imageUrl;
  } catch (error) {
    console.error("Error uploading image: ", error);
  }
};


const submitRecipe = async () => {
  try {
    const recipeData = {
      id: 0,
      title: recipeName.value,
      ingredients: ingredients.value,
      instructions: instructions.value,
      userId: userUID.value,
      imageUrl: imageFile.value,
      description: description.value

    };
    const docRef = await addDoc(collection(db, "recipes"), recipeData);
    console.log("NEW RECIPE ID: " + docRef.id);
    await setDoc(doc(db, "recipes", docRef.id), {
      id: docRef.id,
      title: recipeName.value,
      ingredients: ingredients.value,
      instructions: instructions.value,
      userId: userUID.value,
      imageUrl: imageFile.value,
      description: description.value
});
    


  } catch (e) {
    console.error("Error adding recipe ", e);
  }
};

const addIngredient = () => {
  ingredients.value.push("");
};

const removeIngredient = (index) => {
  ingredients.value.splice(index, 1);
};
const addInstruction = () => {
  instructions.value.push("");
};

const removeInstruction = (index) => {
  instructions.value.splice(index, 1);
};

// Function to delete a recipe by its ID
const deleteRecipe = async (recipeId) => {
  console.log("RECIPE ID: "+recipeId);
  try {
    // Create a reference to the recipe document
    const recipeRef = doc(db, 'recipes', recipeId);
   
    await deleteDoc(recipeRef);
    console.log("Recipe deleted successfully.");
  } catch (error) {
    console.error("Error deleting recipe:", error);
  }
};

</script>


<template>
  <body>
    <div class="wrapper">
      <h1 class="bold" ></h1>
    <div class="card-container">
<div v-for="(recipe, index) in recipes" :key="recipe.id" class="card">
  <div class="img-container">
    <img class="card-img" :src="recipe.imageUrl" alt="">
  </div>
<div class="card-text">
  <div class="card-title bold"> {{ recipe.title }}</div>
  <div class="card-description">{{ recipe.description }}</div>
  <!-- <button @click="deleteRecipe(recipe.id)" >Delete</button> -->
  <img class="deleterecipe" @click="deleteRecipe(recipe.id)" src="../assets/delete.svg" alt="">
</div>
</div>
<img class="addrecipe" @click="showForm=true" src="../assets/addrecipe.svg" alt="">
    </div>
      </div>


      <!-- Add recipe form -->
<div v-if="showForm" class="form">
<img class="close-btn" @click="showForm=false" src="../images/close.svg" alt="">
<input class="title" placeholder="Recipe title" v-model ="recipeName" type="text">
<input class="description" placeholder="A short description" v-model ="description" type="text">
<h4>Ingredients</h4>
<div class="ingredient-container" v-for="(ingredient, index) in ingredients" :key="index">
  <input placeholder="Ingredient" v-model ="ingredients[index]" type="text">
<!-- <button @click="removeIngredient(index)" class="removeIngredient">Remove</button> -->
<img class="delete-form" @click="removeIngredient(index)" src="../assets/delete.svg" alt="">
</div>
<div class="button-container"><button @click="addIngredient" class="addIngredient">+</button></div>

<h4>Instructions</h4>
<div class="ingredient-container" v-for="(instruction, index) in instructions" :key="index">
          <input placeholder="Instruction" v-model="instructions[index]" type="text">
          <img class="delete-form" @click="removeInstruction(index)" src="../assets/delete.svg" alt="">
        </div>
        <div class="button-container"><button class="addIngredient" @click="addInstruction">+</button></div>
<input type="file" accept="image/*" @change="handleImageUpload">
<button @click="submitRecipe" class="submit">Submit</button>
<!-- Add recipe form end -->


</div>

</body>

</template>
<style scoped>
.deleterecipe{
  width: 20px;
  height: 20px;
  position: absolute;
  right: 12px;
  top: 12px;
  transition: all 0.15s;
  cursor: pointer;
}
.deleterecipe:hover{
  scale: 1.2;
}
.addrecipe {
  margin: 30px;
  width: 45px;
  height: 45px;
  cursor: pointer;
}

/* recipe cards */
.card-container{
  display: flex;
  gap: 20px;
  margin-top: 30px;
  align-items: center;
  justify-content: flex-start;
}
.card{
  position: relative;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.219);
  border-radius: 12px;
 padding: 15px;
 width: 250px;
 height: 320px;
 display: flex;
 flex-direction: column;
 justify-content: flex-start;
text-align: center;
padding-top: 30px;

}

.img-container{
  height: 50px;
  overflow: hidden;
}
.card-img{
  max-width: 100%;
  height: auto;
  border-radius: 12px;

}
.card-title{
font-size: 18px;
margin-bottom: 12px;
overflow: hidden;
  text-overflow: ellipsis; /* Add ellipsis for truncated text */
  white-space: nowrap;


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

/* INPUT FORM */
.form{
  padding: 20px 30px;
  border-radius: 12px;
  background-color: rgb(255, 255, 255);
  position: absolute;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 2px 14px rgba(0, 0, 0, 0.137);
  top: 100px;
}

.title{
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 8px;
}
.description{
  height: 35px;
}
.close-btn{
  cursor: pointer;
  width: 30px;
  height: 30px;
  align-self: flex-end;
  margin-bottom: 20px;
  transition: all 0.2s;
}
.close-btn:hover{
  scale: 1.2;
}

input{
  padding: 3px 6px;
 
}
h4{
  font-weight: bold;
  margin: 12px;
  text-align: center;
}

/* delete ingredient/delete instruction btn */
.delete-form{
  width: 20px;
  height: 20px;
  cursor: pointer;
  margin-left: 15px;
  transition: all 0.15s;

}

.delete-form:hover{
  scale: 1.2;

}

/* ingredient/instruction container */
.ingredient-container{
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 7px;
}

/* add ingredient/instruction btn */
.addIngredient{
background-color: rgb(22, 119, 22);
border: none;
color: white;
font-size: 20px;
padding: 2px 10px;
border-radius: 12px;
margin-top: 8px;
cursor: pointer;
margin-right: 22.5px;
transition: all 0.15s;
}

.addIngredient:hover{
  background-color: rgb(13, 197, 13);
  scale: 1.2;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.555);
}
.button-container{
  width: 100%;
  display: flex;
  
  align-items: flex-end;
  justify-content: flex-end;
  height: 100%;


}

/* submit btn */
.submit{
  background-color: green;
  border: none;
  padding: 12px;
  margin-top: 14px;
  font-size: 17px;
  color: white;
  font-weight: 500;
border-radius: 12px;
box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.418);
cursor: pointer;
transition: all 0.2s;
}

.submit:hover{
  background-color: rgb(57, 172, 28);
}
.submit:active{
  scale: 1.1;
}


@media only screen and (max-width: 768px) {
  .wrapper{
    height: auto;
  }
.card-container{
flex-direction: column;
}

}

</style>