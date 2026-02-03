<script setup>
import { reactive } from 'vue';
import { RouterLink, RouterView } from 'vue-router'

// const isActive = ref(true)
const lista = reactive({orarend: false, naplo: false, home: true, hianyzas: false, settings: false})

function setActive(key) {
  Object.keys(lista).forEach(k => (lista[k] = false))
  lista[key] = true
}

</script>

<template>

    <nav>
        <ul>
            <li @click="setActive('orarend')" :class="{ active: lista.orarend }">
                <RouterLink to="/orarend">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar-icon lucide-calendar"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
                </RouterLink>
            </li>
            <li @click="setActive('naplo')" :class="{ active: lista.naplo }">
                <RouterLink to="/jegyek">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-icon lucide-book"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/></svg>
                </RouterLink>

            </li>
            <li @click="setActive('home')" :class="{ active: lista.home }" id="home">
                <RouterLink to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-house-icon lucide-house"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                </RouterLink>
            </li>
            <li @click="setActive('hianyzas')" :class="{ active: lista.hianyzas }">
                <RouterLink to="/hianyzasok">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clipboard-clock-icon lucide-clipboard-clock"><path d="M16 14v2.2l1.6 1"/><path d="M16 4h2a2 2 0 0 1 2 2v.832"/><path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h2"/><circle cx="16" cy="16" r="6"/><rect x="8" y="2" width="8" height="4" rx="1"/></svg>
                </RouterLink>
            </li>
            <li @click="setActive('settings')" :class="{ active: lista.settings }">
                <RouterLink to="/beallitasok">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings-icon lucide-settings"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>
                </RouterLink>
            </li>
        </ul>
    </nav>

</template>

<style scoped>
    nav {
        position: fixed;
        bottom: 1rem;
        left: 50%;
        translate: -50% 0;
        width: 90vw;
        height: 4rem;
        background-color: var(--Bright-Snow);
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 10px;
        border-radius: 1.75rem;
        z-index: 50;

        ul {
            list-style: none;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            width: 100%;
            height: 100%;
        }
        li {
            width: 45px;
            height: 45px;
        }
        li svg {
            box-sizing: content-box;
            height: 30px;
            width: 30px;
            color: var(--Carbon-Black);
            transition: all 0.25s ease;
            padding: 7.5px;
            border-radius: 1.25rem;
            box-shadow: none;
        }
    }
    .active svg {
        box-sizing: content-box;
        background-color: var(--Carbon-Black);
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        color: var(--Bright-Snow);
    }
</style>