<script setup lang="js">
import Activity from "../components/Activity.vue";
import { translateKey as t } from "@/data/translate.js";
</script>

<template>
  <div class="activity-container">
    <h1>{{ t('today') }}</h1>
    <Activity />
    <Activity />
    <Activity />
    <Activity />
    <Activity />
    <Activity />
    <Activity />
    <Activity />
  </div> 
</template>




<!-- 


Guys, legyen központi css rendszer >:(


-->

<style scoped>
h1 {
  font-weight: bold;
}
</style>
