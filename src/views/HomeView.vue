<script setup>
import { ref, computed } from 'vue';
import ActivityContainer from "../components/ActivityContainer.vue";
import HWContainer from "../components/HWContainer.vue";
import dayjs from 'dayjs';
import { translateKey as t } from "@/data/translate.js";

const hour = Number(dayjs().format('HH'))

function uzenet() {
    if (hour < 10) return t('good_morning')
    if (hour < 12) return t("nice_day")
    if (hour < 18) return t('good_afternoon')
    if (hour < 3) return t('good_night')
}

</script>

<template>
    <h1 id="uzenet">{{uzenet()}}</h1>

    <HWContainer />
    <ActivityContainer />


</template>

<style scoped>

</style>