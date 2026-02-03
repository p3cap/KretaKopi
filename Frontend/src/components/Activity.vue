<script setup>
import { ref } from 'vue';

const isPopupOpen = ref(false);
</script>

<template>

<Popup display="center" :isOpen="isPopupOpen" @close="isPopupOpen = false">
    <h1>asd</h1>
    <p @click="isPopupOpen=false">Bezárás</p>
</Popup>

<div class="container" @click="isPopupOpen = true">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-icon lucide-file"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/></svg>
    <div>
        <h2>Írásbeli témazáró dolgozat</h2>
        <p>Történelem</p>
        <p>2024. május 15., szerda</p>
    </div>
</div>

</template>

<style scoped>
.container {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-top: 20px;
    padding: 0.5rem 1rem;
    transition: all 0.2s ease;
    border-radius: 1.75rem;
}
.container svg {
    color: var(--Secondary);
    height: 40px;
    width: 40px;
}
.container h2 {
    color: var(--Primary);
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.5;
}
.container:hover {
    background-color: aliceblue;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 10px;
}
div p {
    font-size: 0.8rem;
}
div p:nth-last-of-type(2n+1) {
    font-size: 0.75rem;
    color: var(--Slate-Grey);
}
</style>