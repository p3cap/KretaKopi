<script setup lang="js">
import setting from "@/components/SettingsComponent.vue"
import { translateKey as t } from "@/data/translate.js"
</script>

<!-- 
HOW TO

<setting 
    json-path="setting path"
    type="drop-down"/"switch"/"numberInput"/"textInput"
    :description="..."
    :state-list="['option1', 'option2']" 
    >
    {{ t("language") }},
</setting>
-->

<template>
    <div class="page">
        <h1>{{ t("settings") }}</h1>
        <setting
        json-path="user_settings/language"
        type="drop-down"
        :description="t('setting_language_desc')"
        :state-list="['EN', 'HU']"
        >
        {{ t("language") }},
        </setting>
        <br>
        <setting
        json-path="user_settings/notifications/exam_notifications"
        type="switch"
        >
        {{ t("notifications") }}
        </setting>
    </div>
</template>