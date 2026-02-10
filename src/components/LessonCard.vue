<script setup>

const props = defineProps({
  lesson: {
    type: Object,
    required: true
  },
  teacher: {
    type: Object,
    required: true
  }
});

</script>

<template>

    <div class="lesson-card">
        <div>
            <p class="lesson-name">{{ lesson.class_id }}</p>
            <p class="lesson-teacher">{{ teacher.name }}</p>
        </div>
        <p class="lesson-start">{{ lesson.start_time}}</p>
        <p class="dash">-</p>
        <p class="lesson-end">{{ lesson.end_time }}</p>
    </div>

</template>

<!-- 


Guys, legyen központi css rendszer >:(


-->

<style scoped>
    .lesson-card {
        background-color: var(--Bright-Snow);
        box-shadow: var(--Main-Shadow);
        border-radius: 2rem;
        padding: 0.5rem 1.25rem;
        height: 6rem;
        position: relative;
        overflow: hidden;

        &::before {
            content: '';
            position: absolute;
            height: 100%;
            width: 4.5rem;
            background-color: var(--Secondary);
            right: 0;
            top: 50%;
            translate: 0 -50%;
            /* border-radius: 3rem; */
            box-shadow: 6.7px 0px 10px 0px rgba(0, 0, 0, 0.25) inset;
        }
        div {
            position: absolute;
            top: 50%;
            translate: 0 -50%;
            width: 40%;
        }
        .lesson-name {
            font-weight: 600;
            margin-bottom: 0.5rem;
            word-wrap: break-word;
        }
        .lesson-teacher {
            font-size: 0.75rem;
            color: var(--Slate-Grey);
        }
        .lesson-start, .lesson-end, .dash {
            position: absolute;
            right: 1.25rem;
            line-height: 1;
            font-size: 0.8rem;
            color: var(--Bright-Snow);
            font-weight: 600;
            /* text-shadow: 0px 0px 5px rgb(0, 0, 0); */
        }
        .lesson-start {
            top: 35%;
            translate: 0 -50%;
        }
        .lesson-end {
            bottom: 35%;
            translate: 0 50%;
        }
        .dash {
            top: 50%;
            translate: calc(-1.125rem * 0.8) -50%;
        }
    }
</style>