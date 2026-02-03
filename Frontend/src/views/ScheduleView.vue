<script setup lang="js">
//translation
import { translateKey as t } from "@/data/translate.js";

import LessonCard from "../components/LessonCard.vue";
import { ref } from "vue";

const currentDay = ref('monday');

</script>

<template>
    <div id="days">
        <button class="week-switch left"><</button>
        <button class="week-switch right">></button>
        <ul>
            <li>
                <p>{{ t("monday").slice(0,2) }}</p>
                <!-- 
                Pl fordítás: "monday" kulcs és csak az első 2 betűt mutassa 
                fordítás hozzáadása a data/translate.js fájlban
                -->
                <p>6</p>
            </li>
            <li>
                <p>{{ t("tuesday").slice(0,2) }}</p>
                <p>31</p>
            </li>
            <li>
                <p>{{ t("wednesday").slice(0,2) }}</p>
                <p>13</p>
            </li>
            <li>
                <p>{{ t("thursday").slice(0,2) }}</p>
                <p>0</p>
            </li>
            <li>
                <p>{{ t("friday").slice(0,2) }}</p>
                <p>0</p>
            </li>
            <li>
                <p>{{ t("saturday").slice(0,2) }}</p>
                <p>0</p>
            </li>
            <li>
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

        .week-switch {
            background-color: transparent;
            border: none;
            font-size: 1.5rem;
            position: absolute;
            top: 0.5rem;
            line-height: 1;
        }
        .left {
            left: 1.5rem;
        }
        .right {
            right: 1.5rem;
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
            p:nth-of-type(2n) {
                color: var(--Pale-Slate2);
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
            gap: 1.5rem;
        }
    }
</style>