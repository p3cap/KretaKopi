<script setup>
import { NotebookPen } from 'lucide-vue-next';
import HomeWorks from "../components/HomeWorks.vue";
</script>

<template>
    <main>
        <div class="container">
            <div id="header">
                <NotebookPen id="note" />
                <p id="title">Házi feladataid</p>
            </div>
            <HomeWorks />
            <HomeWorks />
        </div>
    </main>
</template>

<style scoped>
main {
    display: flex;
    justify-content: center;
}
.container {
    display: flex;
    flex-direction: column;
    width: 90%;
    height: auto;
    background-color: var(--Alabaster-Grey);
    border-radius: 1rem;
    padding: 15px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px inset, rgba(0, 0, 0, 0.3) 0px 3px 7px 3px inset;
    margin: 20px 0 20px 0;
}
#header {
    position: relative;
    height: 30px;
    display: flex;
    align-items: center;
    gap:6.7px;
    width: fit-content;
}
#title{
    position: relative;
}
#title::after{
    content: "";
    position: absolute;
    left: 0;
    bottom: -6px;
    width: 100%; /* pontosan a szöveg szélessége */
    height: 8px;
    background-color: red;
    opacity: 0.5;
    border-radius: 0.5rem;
}

p {
    font-size: 20px;
    color: var(--Carbon-Black);
}
#note {
    height: 30px;
    width: 30px;
}
#underline {
    top: 80%;
    width: text;
    height: 10px;
    position: absolute;
    left: 2.3rem;
    opacity: 50%;
    border-radius: 0.5rem;
    background-color: red;
}
</style>