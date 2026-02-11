<script setup>
import { reactive, ref } from 'vue';
import { getData } from '@/data/data.js';

const grades = reactive(getData("grades"));
const english = reactive(grades["English-11a"]);
console.log(english)

const isPopupOpen = ref(false);
const selectedGrade = ref(null);

function openPopup(grade) {
    selectedGrade.value = grade;
    isPopupOpen.value = true;
}
</script>

<template>
    
<div
  v-for="grade in english"
  :key="grade.id ?? grade.date"
  class="container"
  @click="openPopup(grade)"
>
    <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-icon lucide-file"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/></svg> -->
    <h1 :class="{
        five: grade.grade==5,
        four: grade.grade==4,
        three: grade.grade==3,
        two: grade.grade==2,
        one: grade.grade==1,
        }">{{ grade.grade }}</h1>
    <div>
        <h2>{{ grade.description }}</h2>
        <p>{{ grade.date }}</p>
        <p></p>
    </div>
</div>

<Transition name="fade">
    <div v-if="isPopupOpen && selectedGrade" class="popup" @click="isPopupOpen = false">
        <div class="inner_window" @click.stop>
            <h2>Történelem</h2>
            <hr>
            <div class="inner_inner_window">
                <h2>{{selectedGrade.description}}</h2>
                <p>{{selectedGrade.grade}}</p>
                <p>Az értékelés súlya: {{selectedGrade.weight}}%</p>
                <p id="date">2026. február 4., szerda (4. óra)</p>
            </div>

            <div @click="isPopupOpen = false" class="buttonshi">
                <p>Bezárás</p>
            </div>
        </div>
    </div>
</Transition>

</template>


<!-- 


Guys, legyen központi css rendszer >:(


-->

<style scoped>
h1 {
    font-weight: 800;
    background-color: var(--Pale-Slate);
    box-shadow: var(--Main-Shadow) inset;
    text-shadow: 0px 1px 5px rgba(0, 0, 0, 0.45);
    width: 3rem;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    line-height: 1;
}
.five {
    color: #00ff00;
}
.four {
    color: #88ff00;
}
.three {
    color: #ffff00;
}
.two {
    color: #ff8800;
}
.one {
    color: #ff0000;
}
.container {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 15px;
    margin-top: 20px;
    padding: 0.5rem 1rem;
    transition: all 0.2s ease;
    border-radius: 1.75rem;
}
.container svg {
    color: var(--Carbon-Black);
    height: 40px;
    width: 40px;
}
.container h2 {
    color: var(--Carbon-Black);
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.5;
}
.container:hover {
    background-color: aliceblue;
    box-shadow: var(--Main-Shadow);
}
div p {
    font-size: 0.8rem;
}
.container p:nth-last-of-type(2n+1) {
    font-size: 0.75rem;
    color: var(--Slate-Grey);
}
.popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #303A4355;
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    color: white;
}
.inner_window {
    text-align: left;
    color: var(--Carbon-Black);
    padding: 0.5rem;
    background: #F4F9FD;
    border-radius: 16px;
    box-shadow: 0px 5px 15px -5px #1D252CAF;
    backdrop-filter: blur(9.1px);
    -webkit-backdrop-filter: blur(9.1px);
    border: 1px solid #F4F9FD55;
    border-radius: 1rem;
    min-width: 300px;
    max-width: 90%;
    height: 570px;
    width: 300px;
    display: flex;
    flex-direction: column;
}
.inner_window h2 {
    font-size: 1.5rem;
    font-weight: 600;
    align-self: center;
    margin-bottom: 2px;
}
.inner_inner_window {
    margin-top: 0.5rem;
    align-self: center;
    border-radius: 0.5rem;
    padding: 0.5rem;
    height: 600px;
    width: 90%;
}
.inner_inner_window hr {
    color: var(--Carbon-Black);
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
}
.inner_inner_window p {
    font-size: 1rem;
}
#date {
    align-self: flex-end;
}
.fade-enter-active, .fade-leave-active {
  transition: ease opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.buttonshi {
    align-self: flex-end;
    color: var(--Bright-Snow);
    margin-top: auto;
    background-color: var(--Bright-Red);
    padding: 0.5rem;
    border-radius: 0.5rem;
    text-align: center;
    cursor: pointer;
    width: 30%;
    transition: 0.1s;
}
.buttonshi:hover {
    background-color: var(--Primary);
} 
</style>