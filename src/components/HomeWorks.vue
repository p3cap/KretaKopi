<script setup>

</script>

<template>
    <div class="box">
        <hr>
        <p id="toptext">Matematika</p>
        <p id="desc">Trigonometrikus egyenletek megoldása</p>
    </div>
</template>


<!-- 


Guys, legyen központi css rendszer >:(


-->

<style scoped>
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
.box:hover {
    background-color: var(--Platinum);
}
#toptext {
    font-size: 17px;
    color: var(--Carbon-Black);
}
#desc {
    font-size: 14px;
    color: var(--Iron-Grey);
}
</style>