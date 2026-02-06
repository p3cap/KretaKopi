<script setup>
import { reactive } from "vue";
import { translateKey as t } from "@/data/translate.js";
import { getData } from "@/data/data";
import AbsesenceCard from "@/components/AbsesenceCard.vue";
import AbsenceCount from "@/components/AbsenceCount.vue";

const omissions = reactive(getData("omissions"));

function handleViewed(omission) {
  omission.viewed = true;
}
</script>

<template>
    <h1>{{t('absence')}}
    </h1>
    <AbsenceCount/>
  <AbsesenceCard
        v-for="(o, i) in omissions"
        :key="i"
        :omission="o"
        @viewed="handleViewed"
      />


</template>
<style scoped>


</style>