<script setup lang="js">
//translation
import { translateKey as t } from "@/data/translate.js";

import LessonCard from "../components/LessonCard.vue";
import { ref } from "vue";

const currentDay = ref('monday');

function left() {

}
function right() {

}

import { reactive } from 'vue';

// const isActive = ref(true)
const lista = reactive({'Mo': true, 'Tu': false, 'We': false, 'Th': false, 'Fr': false, 'Sa': false, 'Su': false})

function setActive(key) {
  Object.keys(lista).forEach(k => (lista[k] = false))
  lista[key] = true
}

</script>

<template>
    <div id="days">
        <button class="week-switch left" @click="left"><</button>
        <p class="week">Január 01-07.</p>
        <button class="week-switch right" @click="right">></button>
        <ul>
            <li @click="setActive('Mo')" :class="{ active: lista.Mo }">
                <p @click="">{{ t("monday").slice(0,2) }}</p>
                <!-- 
                Pl fordítás: "monday" kulcs és csak az első 2 betűt mutassa 
                fordítás hozzáadása a data/translate.js fájlban
                -->
                <p>6</p>
            </li>
            <li @click="setActive('Tu')" :class="{ active: lista.Tu }">
                <p>{{ t("tuesday").slice(0,2) }}</p>
                <p>31</p>
            </li>
            <li @click="setActive('We')" :class="{ active: lista.We }">
                <p>{{ t("wednesday").slice(0,2) }}</p>
                <p>13</p>
            </li>
            <li @click="setActive('Th')" :class="{ active: lista.Th }">
                <p>{{ t("thursday").slice(0,2) }}</p>
                <p>0</p>
            </li>
            <li @click="setActive('Fr')" :class="{ active: lista.Fr }">
                <p>{{ t("friday").slice(0,2) }}</p>
                <p>0</p>
            </li>
            <li @click="setActive('Sa')" :class="{ active: lista.Sa }">
                <p>{{ t("saturday").slice(0,2) }}</p>
                <p>0</p>
            </li>
            <li @click="setActive('Su')" :class="{ active: lista.Su }">
                <p>{{ t("sunday").slice(0,2) }}</p>
                <p>0</p>
            </li>
        </ul>
    </div>

    <main>
        <p class="day-name">{{ t(currentDay) }}</p>
        <div class="lessons">
            <LessonCard />
            <LessonCard />
            <LessonCard />
            <LessonCard />
            <LessonCard />
            <LessonCard />
            <LessonCard />
            <LessonCard />
            <LessonCard />
        </div>
    </main>
</template>

<style scoped>
    ul {
        list-style: none;
        display: flex;
        justify-content: space-evenly;
        width: 100%;
    }
    #days {
        background-color: var(--Bright-Snow);
        padding: 0.5rem;
        padding-top: 2.5rem;
        border-radius: 1.5rem;
        box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 10px;
        position: relative;
        margin-top: 1rem;

        .week-switch {
            background-color: transparent;
            border: none;
            font-size: 1.5rem;
            position: absolute;
            top: 0.5rem;
            line-height: 1;
            cursor: pointer;
        }
        .left {
            left: 1.5rem;
        }
        .right {
            right: 1.5rem;
        }
        .week {
            position: absolute;
            top: 0.75rem;
            line-height: 1;
            text-align: center;
            font-size: 1rem;
            left: 50%;
            translate: -50% 0;
        }
        li {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-size: 0.75rem;
            width: 2.25rem;
            border-radius: 1rem;
            padding: 5px 10px;
            border: 2px solid var(--Pale-Slate2);
            cursor: pointer;
            transition: all 0.25s ease;

            p:nth-of-type(2n) {
                transition: all 0.25s ease;
                color: var(--Slate-Grey);
            }
        }
        .active {
            background-color: var(--Secondary);
            border-color: var(--Secondary);
            color: var(--Bright-Snow);
            box-shadow: 0px 0px 15px -5px var(--Secondary);
            text-shadow: 0px 0px 2px white;

            p:nth-of-type(2n) {
                color: var(--Bright-Snow);
            }
        }
    }
    main {
        padding: 2rem 1rem 5rem 1rem;

        .day-name {
            font-weight: 600;
            font-size: 2rem;
        }
        .lessons {
            padding: 2rem 0;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
    }
</style>