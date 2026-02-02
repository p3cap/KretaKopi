<script setup lang="js">
//translation
import { translateKey as t } from "@/../data/translate.js";

import Navbar from "../components/Navbar.vue";
</script>

<template>
    <div id="days">
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
</template>

<style scoped>
    #days {
        margin-top: 4rem;
    }
    ul {
        list-style: none;
        display: flex;
        justify-content: space-evenly;
        width: 100vw;
        padding: 0 0.5rem;
    }
    #days li {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 2.5rem;
        border-radius: 1rem;
        padding: 10px min(5vw, 2rem);
        background-color: rgba(185, 185, 185, 0.354);
        backdrop-filter: blur(3.6px);
        border: 1px solid hsl(0, 0%, 100%, 0.5);
        box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;

    }
</style>