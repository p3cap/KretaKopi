<script setup>
import { RouterView, useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import { useSwipe } from '@vueuse/core'

import Navbar from "./components/Navbar.vue"
import Icon from './components/Icon.vue'
import Profile from './components/Profile.vue'

const router = useRouter()
const swipeArea = ref(null)

const pages = ['/orarend', '/jegyek', '/', '/hianyzasok', '/beallitasok']

// const transitionName = ref('slide-left')

// const { direction } = useSwipe(swipeArea, {
//   threshold: 80,
// })

// watch(direction, (dir) => {
//   const current = router.currentRoute.value.path
//   const index = pages.indexOf(current)

//   if (dir === 'left' && index < pages.length - 1) {
//     transitionName.value = 'slide-left'
//     router.push(pages[index + 1])
//   }

//   if (dir === 'right' && index > 0) {
//     transitionName.value = 'slide-right'
//     router.push(pages[index - 1])
//   }
// })
</script>

<template>
  <div ref="swipeArea" class="app">
    <div class="top-shadow"></div>
    <Icon/>
    <Profile />
    <Navbar/>
    <RouterView v-slot="{ Component }">
      <!-- <Transition :name="transitionName" mode="out-in"> -->
        <component :is="Component" />
      <!-- </Transition> -->
    </RouterView>
    <div class="bottom-shadow"></div>
  </div>
</template>

<style scoped>
  .top-shadow {
    position: fixed;
    top: 0;
    height: 5rem;
    width: 100vw;
    background-image: linear-gradient(180deg, var(--Alabaster-Grey), transparent);
    z-index: 25;
  }
  .bottom-shadow {
    position: fixed;
    bottom: 0;
    height: 5rem;
    width: 100vw;
    background-image: linear-gradient(0deg, var(--Alabaster-Grey) 50%, transparent);
    z-index: 25;
  }
  .app {
    height: fit-content;
    touch-action: pan-y;
    overflow-x: hidden;
    padding-bottom: 1rem;
  }

  /* .slide-left-enter-active,
  .slide-left-leave-active {
    transition: transform 0.35s ease, opacity 0.35s ease;
  }

  .slide-left-enter-from {
    transform: translateX(100%);
    opacity: 0;
  }

  .slide-left-leave-to {
    transform: translateX(-100%);
    opacity: 0;
  }

  .slide-right-enter-active,
  .slide-right-leave-active {
    transition: transform 0.35s ease, opacity 0.35s ease;
  }

  .slide-right-enter-from {
    transform: translateX(-100%);
    opacity: 0;
  }

  .slide-right-leave-to {
    transform: translateX(100%);
    opacity: 0;
  } */
</style>
