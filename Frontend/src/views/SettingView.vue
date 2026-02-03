<script setup lang="js">
import { ref } from "vue"
import { writeData, getData } from "@/data/data"
import { translateKey as t } from "@/data/translate.js"
import router from "@/router"

const isHU = ref(getData("user_settings/language") === "HU")

function changeLang() {
	const lang = isHU.value ? "HU" : "EN"
	writeData("user_settings/language", lang)
	isHU = lang === "HU"
	router.go() // refresh page
}
</script>

<template>
	<h1>{{ t("settings") }}</h1>

	<p>lang test</p>

	<input type="checkbox" v-model="isHU" @change="changeLang" />
	<p>{{ isHU ? "EN" : "HU" }}</p>
</template>
