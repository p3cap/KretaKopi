<script setup lang="js">
import { ref } from "vue"
import { writeData, getData } from "@/data/data"
import { translateKey as t } from "@/data/translate.js"
import router from "@/router"

let isHU = ref(getData("user_settings/language") === "HU")

function changeLang() {
    isHU = !isHU
	const lang = isHU ? "HU" : "EN"
	writeData("user_settings/language", lang)// Refresh the page to apply language changes
}
</script>

<template>
	<p>lang test</p>

	<input type="checkbox" @change="changeLang" />
	<p>{{ isHU ? "HU" : "EN" }}</p>
</template>
