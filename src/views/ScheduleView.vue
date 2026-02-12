<script setup lang="js">
import dayjs from "dayjs";

//translation
import { translateKey as t } from "@/data/translate.js";
import { ArrowLeft, ArrowRight } from "lucide-vue-next";

import LessonCard from "../components/LessonCard.vue";
import { ref, computed,reactive } from "vue";
import { getData } from "@/data/data";

const timetable = reactive(getData("timetable"));
const teachers = reactive(getData("teachers"));
console.debug(timetable);
console.debug(teachers);


// computed -> updatelődik
const date = ref(dayjs());
const weekStart = computed(function(){ 
    return date.value.startOf("week").add(1,"day") // alapbó, vasárnap lenne
})
const dateTitle = computed(function(){ 
    return weekStart.value.format("MMMM") +" "+ weekStart.value.format("D") +"-"+ weekStart.value.add(Object.keys(timetable).length-1, "day").format("D")
})

const selectedDay = ref(date.value.format("dddd").toLowerCase())

function backWeek() {
    date.value = date.value.add(-1, "week")
}
function forwardWeek() {
    date.value = date.value.add(1, "week")
}

</script>

<template>
    <div class="page">
        <nav id="days">
            <ArrowLeft class="week-switch left" @click="backWeek"></ArrowLeft>

            <p class="week">{{ dateTitle }}</p>

            <ArrowRight class="week-switch right" @click="forwardWeek"></ArrowRight>
            <ul>
                <li v-for="(_,day_name, i) in timetable" @click="selectedDay = day_name" :class="{ active: selectedDay===day_name }">
                    <p>{{ t(day_name).slice(0,2) }}</p>
                    <p>{{ weekStart.add(i, "day").format("D") }}</p>
                </li>
            </ul>
        </nav>
        <main>
            <div class="lesson-holder" v-for="(day, day_name) in timetable">
                <div class="lessons" v-if="day_name === selectedDay">
                    <p class="day-name">{{ t(day_name.toLowerCase()) }}</p>
                    <p v-if="day.length < 1">{{ t("empty_timetable_msg") }}</p>
                    <LessonCard v-for="l in day" :lesson="l" :teacher="teachers[l.teacher_id]"/>
                </div>
            </div>
        </main>
    </div>
</template>


<!-- 


Guys, legyen központi css rendszer >:(


-->

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
        box-shadow: var(--Main-Shadow);
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
            /* text-shadow: 0px 0px 2px white; */

            p:nth-of-type(2n) {
                color: var(--Bright-Snow);
            }
        }
    }
    main {
        padding: 2rem 0.5rem 0rem 0.5rem;

        .day-name {
            font-weight: 600;
            font-size: 2rem;
            line-height: 3rem;
        }
        .lessons {
            padding: 1rem 0 0 0;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
    }
</style>