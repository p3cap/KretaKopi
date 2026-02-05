<script setup>
import { computed } from "vue"
import { writeData, getData } from "@/data/data"
import router from "@/router"

const props = defineProps({
	jsonPath: { type: String, required: true },
	type: { type: String, default: "switch" },
	description: { type: String, default: "" },
	stateList: { type: Array, default: () => ["true", "false"] },
	icon: { type: String, default: "" },
	refreshOnApply: { type: Boolean, default: false }
})

// getter setter
const state = computed({
	get() {
		return getData(props.jsonPath)
	},
	set(value) {
		writeData(props.jsonPath, value)

		if (props.refreshOnApply) {
			router.go(0) // refresh the view
		}
	}
})
</script>


<template>
	<h2 class="setting-title">
		<slot></slot>
	</h2>
	<p class="setting-desc">{{ description }}</p>

	<!-- switch -->
	<input 
		v-if="props.type === 'switch'"
		type="checkbox"
		:checked="state"
		class="input-button"
		@change="state = $event.target.checked"
	/>
	<!-- drop-down -->
	<select
		v-else-if="props.type === 'drop-down'"
		v-model="state"
		class="input-field"
	>
		<option
			v-for="item in props.stateList"
			:key="item"
			:value="item"
		>
			{{ item }}
		</option>
	</select>
	<!-- number -->
	<input
		v-else-if="props.type === 'numberInput'"
		type="number"
		v-model="state"
		class="input-field"
	/>
	<!-- text -->
	<input
		v-else-if="props.type === 'textInput'"
		type="text"
		v-model="state"
	/>
</template>
