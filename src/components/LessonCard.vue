<script>

</script>

<template>

    <div class="lesson-card">
        <p class="lesson-name">Történelem</p>
        <p class="lesson-teacher">Sós Ferenc</p>
        <p class="lesson-time">8:00 - 9:00</p>
    </div>

</template>

<!-- 


Guys, legyen központi css rendszer >:(


-->

<style scoped>
    .lesson-card {
        background-color: var(--Bright-Snow);
        box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 10px;
        border-radius: 1rem;
        padding: 1rem 1.5rem;
        position: relative;

        &::before {
            content: '';
            position: absolute;
            height: 1.5rem;
            width: 4px;
            background-color: var(--Secondary);
            left: -1px;
            top: 50%;
            translate: 0 -50%;
            border-radius: 3rem;
        }
        .lesson-name {
            font-weight: 600;
        }
        .lesson-teacher {
            font-size: 0.75rem;
            color: var(--Slate-Grey);
        }
        .lesson-time {
            position: absolute;
            right: 1.5rem;
            line-height: 1;
            top: 50%;
            translate: 0 -50%;
            color: var(--Iron-Grey);
        }
    }
</style>