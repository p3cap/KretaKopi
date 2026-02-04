<script setup lang="js">
import settingsComponent from "@/components/SettingsComponent.vue"
import { translateKey as t } from "@/data/translate.js"
</script>

<template>
    <h1>{{ t("settings") }}</h1>
    <settingsComponent />
</template>
