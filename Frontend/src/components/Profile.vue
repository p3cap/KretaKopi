<script setup>
import { ref, watch } from 'vue';
import { animate, waapi, eases, spring } from 'animejs';

const open = ref(false)

watch(open, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''

  waapi.animate('.profile-btn', {
    x: val ? '-9rem' : '0rem',
    y: val ? '17rem' : '0',
    ease: eases.outQuad,
    duration: 300,
  })
})

</script>
<template>
    <button class="profile-btn" :class="{'is-active': open}" @click="open=!open" >profile</button>
    <Teleport to="body">
        <transition name="overlay">
            <div v-if="open" class="overlay" @click.self="open = false">
                <div class="sheet">
                    <h2>Profil</h2>
                    <p>fas</p>
                    <p>fas</p>
                </div>
            </div>
        </transition>
    </Teleport>
</template>
<style scoped>

.profile-btn {
  position: fixed;
  top: 20px;
  right: 20px;
  font-size: 20px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1000;

}

.profile-btn.open {
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
}

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.35);
  backdrop-filter: blur(3px);
  z-index: 999;
  display: flex;
  align-items: flex-end;
}

.sheet {
  width: 100%;
  background: rgb(255, 255, 255,0.5);
  border-radius: 20px 20px 0 0;
  
  padding: 20px;
  min-height: 60vh;
  transform: translateY(0);
  transition: transform 0.35s ease;
}

.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.25s ease;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

</style>