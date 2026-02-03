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
    ul {
        list-style: none;
        display: flex;
        justify-content: space-evenly;
        width: 100%;
    }
    #days li {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 0.75rem;
        width: fit-content;
        border-radius: 1rem;
        padding: 5px 10px;
        backdrop-filter: blur(3.6px);
        border: 2px solid var(--Pale-Slate2);
        p:nth-of-type(2n) {
            color: var(--Pale-Slate2);
        }
    }
</style>