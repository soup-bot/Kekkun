<script setup>
import {RouterLink} from "vue-router"
</script>

<template>
  <main>
    <div class="hero-section">
      <div class="hero-container"> 
        <div class="hero-left">
<h2>siscover Delicious Recipes</h2>
<h3>Explore a wide range of mouthwatering dishes that you can easily prepare in your kitchen.</h3>
<div class="btn-container">
 <!-- <router-link to="/recipes">Get Cooking</router-link> -->
<router-link to="/recipes"><button>Get Cooking</button></router-link>
</div>
        </div>
        <div class="hero-right">  <img class="hero-img" src="..//assets/cooking-animate.svg" alt="Cooking Image">
        </div>
      
      </div>
   

  </div>

  <div class="section2">
    <div class="section2-container">
     <h2 class="section2-title">How it works</h2>
    
<div class="card-container">
  <div class="card">
    <img src="..//images/card1.svg" alt="" class="card-img">
    <h3 class="card-title">Look around</h3>
    <p class="card-text" >Search for recipes provided by other cooks!</p>

  </div>
  <div class="card">
    <img src="../images/card2.svg" alt="" class="card-img">
    <h3 class="card-title">Share with others</h3>
    <p class="card-text">Share your own recipes with other cooks!</p>
  </div>
  <div class="card">
    <img src="..//images/card3.svg" alt="" class="card-img">
    <h3 class="card-title">Spread love</h3>
    <p class="card-text">Like and comment on others' recipes!</p>
  </div>
</div>
</div>
  </div>
  </main>
</template>

<style scoped>

/* section 2 */
.section2{
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 60px;
  /* background: radial-gradient(circle at 50% 119%,#C6D565, #59bd67) */
}
.section2 h2{
  font-weight: bold;
  font-size: 20px;
  text-align: center;
  margin-bottom: 35px;
}
.section2-container{
  max-width: 90ch;
  display: flex;
  flex-direction: column;
  
}
.card{
  background-color: white;
border: 1px solid;
height: 250px;
width: 200px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 10px;
border-radius: 15px;
border: none;
box-shadow: 2px 2px 12px rgba(66, 66, 66, 0.125);
transition: all 0.2s;
}
.card:hover{
  scale: 1.05;
}
.card-container{
  width: 100%;
  display: flex;
  gap: 30px
}
.card-img{
  width: 60%;
}
.card-title{
  font-size: 16px;
  margin-bottom: 6px;
  font-weight: bold;
}
.card-text{
  font-size: 13px;
  text-align: center;
}

/* section 2 end */
.hero-section{
  padding: 30px;
  width: 100%;
  background-color: rgb(240, 240, 240);
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at 50% 119%,#C6D565, rgba(150, 244, 163, 1))
}

.hero-container{
  display: flex;
  max-width: 90ch;
  align-items: center;
  justify-content: center;
}
.hero-left{
  padding-right: 50px;
}
.hero-left h2{
  font-weight: bold;
  margin-bottom: 12px;
  font-size: 25px;
  text-align: start;
  
}
.hero-left h3{
  margin-bottom: 30px;
  font-size: 15px;
  font-weight: bold;
  
}


button {
  text-decoration: none;
  color: white;
  
  font-weight: bold;
  letter-spacing: 0.6px;
}
button {
 padding: 11px 20px;
 text-decoration: none;

 border-radius: 10px;
 border: 0;
 background-color: rgb(254, 73, 45);
 letter-spacing: 1.5px;
 font-size: 15px;
 transition: all .3s ease;
 box-shadow: rgb(173, 43, 23) 0px 10px 0px 0px;
 color: hsl(0, 0%, 100%);
}

button:hover {
 box-shadow: rgb(173, 43, 23) 0px 7px 0px 0px;
}

button:active {
 background-color: rgb(254, 73, 45);
 /*50, 168, 80*/
 box-shadow: rgb(173, 43, 23) 0px 0px 0px 0px;
 transform: translateY(5px);
 transition: 200ms;
}

.hero-img {
  width: 350px;
}

@media only screen and (max-width: 768px) {
.hero-container{
  flex-direction: column;
  max-width: 40ch;
  
}
.hero-left{
  padding: 10px;
  align-items: center;
  justify-content: center;
}
.hero-left h2 h3{
  text-align: center;
}

.btn-container{
  display: flex;
  align-items: center;
  justify-content: center;
}
.card-container{
  flex-direction: column;
}

}

</style>