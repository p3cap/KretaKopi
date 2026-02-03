<script setup>
import { ref, watch } from 'vue'

const open = ref(false)
const close = () => {
    open.value = false
}
</script>
<template>
    <button class="profile-btn" @click="open = true">profile</button>
    <Teleport to="body">
        <transition name="overlay">
            <div v-if="open" class="overlay">
                <transition name="sheet">
                    <div class="sheet">
                        <div class="handle"></div>
                            <h2>Profil</h2>
                            <p>
                                fas
                            </p>
                            <p>
                                fas
                            </p>
                            <button class="close-btn" @click="close">Bezárás</button>
                        </div>
                </transition>
            </div>
        </transition>
    </Teleport>
</template>
<style scoped>
    .profile-btn{
        cursor: pointer;
    }
    .overlay{
        position: fixed;
        width: 80vw;
        height: 80vh;
        background: rgba(0,0,0,0.35);
        backdrop-filter: blur(10px);
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .handle{
        background-color: black;
        width: 20%;
        height: 20%;
    }

</style>