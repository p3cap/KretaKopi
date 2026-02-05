<script setup lang="js">
import setting from "@/components/SettingsComponent.vue"
import { translateKey as t } from "@/data/translate.js"
</script>

<template>
    <h1>{{ t("settings") }}</h1>
    <setting 
    json-path="user_settings/language"
    type="drop-down"
    :description="t('setting_language_desc')"
    :state-list="['EN', 'HU']"
    >
    {{ t("language") }},
    </setting>

    <setting 
    json-path="user_settings/language"
    type="drop-down"
    :description="t('setting_language_desc')"
    :state-list="['EN', 'HU']"
    >
    {{ t("language") }},
    </setting>
</template>
