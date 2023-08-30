<script setup>
import {RouterLink} from "vue-router"
</script>

<template>
  <main>
    <div class="hero-section">
      <div class="hero-container"> 
        <div class="hero-left">
<h2>Discover Delicious Recipes</h2>
<h3>Explore a wide range of mouthwatering dishes that you can easily prepare in your kitchen.</h3>
<div class="btn-container">
<button class="action-btn" ><router-link to="/recipes">Get Cooking</router-link></button>
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
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
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
}
.action-btn{
  font-size: 15px;
  padding: 8px 10px;
  border: none;
}
.action-btn a{
  text-decoration: none;
  color: white;
}

.action-btn {
  padding: 8px 10px;
  border: none;
  font-size: 15px;
  color: #fff;
  border-radius: 7px;
  font-weight: 700;
  transition: 0.5s;
  transition-property: box-shadow;
}

.action-btn {
  background: rgb(0,140,255);
  box-shadow: 0 0 12px rgba(0, 140, 255, 0.26);
}

.action-btn:hover {
  box-shadow: 0 0 5px rgba(0, 140, 255, 0.571),
              0 0 12px rgba(0, 140, 255, 0.532),
              0 0 20px rgba(0, 140, 255, 0.547),
              0 0 35px rgba(0, 140, 255, 0.452);
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