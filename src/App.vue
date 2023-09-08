<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Nav from "./components/Nav.vue"
import Footer from "./components/Footer.vue";

</script>

<template>
  <Nav></Nav>
  <router-view></router-view>
<Footer></Footer>

</template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

.light{
  font-family: Roboto, sans-serif;
  font-weight: 400;
}
.bold {
  font-family: Robot, sans-serif;
  font-weight: 700;
}

*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: Roboto, sans-serif;
}
body {
  overflow-y: scroll; /* Always show scrollbar */
}
</style>
