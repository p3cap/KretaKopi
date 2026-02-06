<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from "./components/Navbar.vue"
import Icon from './components/Icon.vue';
import Profile from './components/Profile.vue';


// debug
</script>

<template>
  <Icon/>
  <Profile />
  <Navbar/>
  <RouterView />
  <!-- 
  idea
  Change view with side to side swiping?
  -->
</template>

<style scoped>

</style>
