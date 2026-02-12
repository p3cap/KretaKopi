<script setup>
import dayjs from 'dayjs';
import { translateKey as t } from "@/data/translate.js";
import IdkComponent from '@/components/IdkComponent.vue';
import HWContainer from '@/components/HWContainer.vue';
import ActivityContainer from '@/components/ActivityContainer.vue';
// import { getNotifyList } from "@/data/data.js";

const hour = Number(dayjs().format('HH'))

function uzenet() {
    if (hour < 10) return t('good_morning')
    else if (hour < 12) return t("nice_day")
    else if (hour < 18) return t('good_afternoon')
    else return t('good_evening')
}

// const notifications = getNotifyList()

</script>

<template>
    <div class="page">
        <h1 id="uzenet">{{uzenet()}}, <wbr> {{ t("{user}") }}!</h1>
        <HWContainer/>
        
        <ActivityContainer/>
        <!-- <IdkComponent /> -->
    </div>

</template>

<style scoped>

</style>