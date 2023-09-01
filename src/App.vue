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
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body {
  overflow-y: scroll; /* Always show scrollbar */
}
</style>
