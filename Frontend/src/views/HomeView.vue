<script setup>
import { ref, computed } from 'vue';
import ActivityContainer from "../components/ActivityContainer.vue";
import HWContainer from "../components/HWContainer.vue";
import dayjs from 'dayjs';

const hour = Number(dayjs().format('HH'))

const uzenet = computed(() => {
    if (hour < 10) return "Jó reggelt, user!"
    if (hour < 12) return "Szép napot, user!"
    if (hour < 18) return "Szép délutánt, user!"
    if (hour < 3) return "Szép estét, user!"
})

</script>

<template>
    <h1 id="uzenet">{{uzenet}}</h1>

    <HWContainer />
    <ActivityContainer />


</template>

<style scoped>

</style>