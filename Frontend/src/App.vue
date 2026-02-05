<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from "./components/Navbar.vue"
import Icon from './components/Icon.vue';
import Profile from './components/Profile.vue';

</script>

<template>
  <Icon/>
  <Profile />
  <Navbar/>
  <RouterView />

</template>

<style scoped>

</style>
