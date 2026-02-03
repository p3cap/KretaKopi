<script setup>
import { ref, watch } from 'vue'

const open = ref(false)
</script>
<template>
    <p>asdbfisdhiafisahgh</p>
    <button class="profile_btn" @click="open"></button>
    <Teleport to="body">
        <transition name="overlay">
            <div v-if="open" class="overlay" @click.self="close">
                <transition name="sheet">
                    <div class="sheet">
                        <div class="handle"></div>

                            <h2>Profil</h2>
                            <p><strong>Név:</strong> John Doe</p>
                            <p><strong>Email:</strong> john@doe.com</p>

                            <button class="close-btn" @click="close">Bezárás</button>
                        </div>
                </transition>
            </div>
        </transition>
    </Teleport>
</template>
<style scoped>
    p{
        font-size: xx-large;
    }
</style>