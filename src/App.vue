<script setup>
import { useRouter, RouterView } from 'vue-router'
import { ref, watch } from 'vue'
import { useSwipe } from '@vueuse/core'

import Navbar from "./components/Navbar.vue"
import Icon from './components/Icon.vue';
import Profile from './components/Profile.vue';

const router = useRouter()

const swipeArea = ref(null)

const pages = ['/orarend', '/jegyek', '/', '/hianyzasok', '/beallitasok']

const { direction } = useSwipe(swipeArea, {
  threshold: 80,
})

watch(direction, (dir) => {
  const current = router.currentRoute.value.path
  const index = pages.indexOf(current)

  if (dir === 'left' && index < pages.length - 1) {
    router.push(pages[index + 1])
  }

  if (dir === 'right' && index > 0) {
    router.push(pages[index - 1])
  }
})

</script>

<template>
  <div ref="swipeArea" class="app">

    <Icon/>
    <Profile />
    <Navbar/>
    <RouterView />

  </div>
</template>

<style scoped>
  .app {
    min-height: 100vh;
    touch-action: pan-y;
  }
</style>
