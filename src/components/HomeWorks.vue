<script setup>
import { getData } from '@/data/data.js';
import { reactive } from 'vue';
import dayjs from 'dayjs';

const homeworks = reactive(getData("homework"));

const today = dayjs().format('YYYY-MM-DD')
console.log(homeworks[1].deadline)
</script>

<template>
    <div v-for="hw in homeworks" :class="{none: hw.deadline!==today}" class="box">
        <hr>
        <p id="toptext">{{ hw.class_id }}</p>
        <p class="desc">{{ hw.description }}</p>
        <p class="desc">{{ hw.deadline }}</p>
    </div>
</template>


<!-- 


Guys, legyen központi css rendszer >:(


-->

<style scoped>
.none {
    display: none;
}
hr {
    border: 1px solid var(--Pale-Slate2);
    margin-bottom: 0.5rem;
}
.box {
    cursor: pointer;
    margin-top: 10px;
    padding: 5px;
    transition: 0.2s;
    border-radius: 0.5rem;
}
#toptext {
    font-size: 17px;
    color: var(--Carbon-Black);
}
.desc {
    font-size: 14px;
    color: var(--Iron-Grey);
}
</style>