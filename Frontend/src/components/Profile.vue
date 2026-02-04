<script setup>
import { ref, watch } from 'vue'

const open = ref(false)
watch(open, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
})

</script>
<template>
    <button class="profile-btn" :class="{'is-active': open}" @click="open=!open" >profile</button>
    <Teleport to="body">
        <transition name="overlay">
            <div v-if="open" class="overlay">
                <transition name="sheet">
                    <div class="sheet">
                        <div class="profile-data">
                            <h2>Profil</h2>
                            <p>
                                fas
                            </p>
                            <p>
                                fas
                            </p>
                        </div>
                    </div>
                </transition>
            </div>
        </transition>
    </Teleport>
</template>
<style scoped>
    .profile-btn{
        cursor: pointer;
        z-index: 1000;
        position: fixed;
        right: 20px;
        top: 20px;

    }
    .overlay{
        position: fixed;
        inset: 0;
        z-index: 999;
        display: flex;
        align-items: end;
        justify-content: center;
        backdrop-filter: blur(3px);
    }
    .sheet{
        background-color: rgb(0, 0, 0,0.35);
        width: 100vw;
        height: 70vh;
        border-radius: 16px 16px 0px 0px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        
    }
    .overlay-enter-active, .overlay-leave-active {
        transition: all 0.6s ease;
        transition: all translatey(100%);
        
    }
    .overlay-enter-from, .overlay-leave-to {
        opacity: 0;
    }

</style>