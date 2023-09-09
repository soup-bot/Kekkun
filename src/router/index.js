import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {getAuth, onAuthStateChanged} from 'firebase/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/recipes',
      name: 'recipes',
      component: () => import('../views/Recipes.vue')
    },
    {
      path: '/myrecipes',
      name: 'myrecipes',
      component: () => import('../views/MyRecipes.vue'),
      meta:{
        requiresAuth: true,
      }
    },
    {
      path: '/recipe/:id', // Use a dynamic route parameter for recipe ID
      name: 'recipedetails',
      component: () => import('../views/RecipeDetails.vue'),
    },
  ]
})

const getCurrentUser = () => {
return new Promise ((resolve,reject)=>{
  const removeListener = onAuthStateChanged(
    getAuth(),
    (user) => {
      removeListener();
      resolve(user);
    },
    reject
  );
});

};


router.beforeEach(async (to,from,next) =>{
  if (to.matched.some((record) =>record.meta.requiresAuth)){
if(await getCurrentUser()){
  next();
} else {
  alert("Your dont have access");
  next("/");
}
  } else {
    next();
  }
});

export default router
