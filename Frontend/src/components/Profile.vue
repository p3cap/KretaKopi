<script setup>
import { ref, watch, nextTick } from 'vue'
import { waapi, animate, utils, eases } from 'animejs'
import { User } from 'lucide-vue-next'
const open = ref(false)
const btn = ref(null)

watch(open, async (val) => {
  document.body.style.overflow = val ? 'hidden' : ''

  await nextTick()

  const vw = window.innerWidth
  const rect = btn.value.getBoundingClientRect()
  const rem = parseFloat(getComputedStyle(document.documentElement).fontSize)

  const sheet = document.querySelector('.sheet')
  const sheetRect = sheet.getBoundingClientRect()
  const btnRect = btn.value.getBoundingClientRect()

  const targetX = val
    ? vw / 2 - (rect.left + rect.width / 2)
    : 0

  const targetY = val
    ? sheetRect.top - btnRect.top - btnRect.height / 2
    : 0

  waapi.animate(btn.value, {
    x: targetX,
    y: targetY,
    duration: 300,
    ease: eases.outQuad,
    scale: val ? 1.5 : 1,
  })
})
</script>

<template>
    <button ref="btn" class="profile-btn" :class="{'is-active': open}" @click="open=!open" ><User /></button>
    <Teleport to="body">
        <transition name="overlay">
            <div v-if="open" class="overlay" @click.self="open = false">
                <div class="sheet">
                    <h2>Szia (name)!</h2>
                </div>
            </div>
        </transition>
    </Teleport>

</template>
<style scoped>

.profile-btn {
  position: fixed;
  top: 1rem;
  right: 1rem;
  font-size: 20px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 767;
  background-color: #F4F9FD;
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 10px 2.5px;
}



.overlay {
  position: fixed;
  inset: 0;
  background: #303A4355;
  backdrop-filter: blur(3px);
  display: flex;
  align-items: flex-end;
  z-index: 676;
}

.sheet {
  width: 100%;
  background-color: #F4F9FDD0;
  border-radius: 20px 20px 0 0;
  text-align: center;
  padding: 50px;
  height: 80vh;
  transform: translateY(0);
  transition: transform 0.35s ease;
  box-shadow: rgba(0, 0, 0, 0.15) 0px -2.5px 10px;
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