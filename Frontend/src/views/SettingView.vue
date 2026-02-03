<script setup>
import { ref } from "vue"
import { editDataFromJson as editJson } from "@/data/processed_data"

const isHU = ref(true)

function changeLang() {
	const lang = isHU.value ? "HU" : "EN"
	editJson("user_settings/language", lang)
}
</script>

<template>
	<h1>settings</h1>

	<p>lang test</p>

	<input type="checkbox" v-model="isHU" @change="changeLang" />
	<p>{{ isHU ? "HU" : "EN" }}</p>
</template>
