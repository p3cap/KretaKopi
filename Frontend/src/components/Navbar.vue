<script setup>
import { reactive, ref, nextTick, onMounted, watch } from "vue"
import { RouterLink, useRoute } from "vue-router"

const route = useRoute()

const lista = reactive({
  orarend: false,
  naplo: false,
  home: true, // alap: home
  hianyzas: false,
  settings: false,
})

const navRef = ref(null)
const circleRef = ref(null)

function moveCircleTo(el) {
  if (!navRef.value || !circleRef.value || !el) return

  const navRect = navRef.value.getBoundingClientRect()
  const elRect = el.getBoundingClientRect()

  // középre igazítjuk a kört az ikon (li) alá
  const x = elRect.left - navRect.left + (elRect.width - 45) / 2

  circleRef.value.style.transform = `translate(${x}px, -50%)`
}

function setActive(key, e) {
  Object.keys(lista).forEach((k) => (lista[k] = false))
  lista[key] = true
  nextTick(() => moveCircleTo(e.currentTarget))
}

// (opcionális) ha route alapján is akarod állítani, hogy mi az aktív:
function keyFromPath(path) {
  if (path === "/") return "home"
  if (path.startsWith("/orarend")) return "orarend"
  if (path.startsWith("/jegyek")) return "naplo"
  if (path.startsWith("/hianyzasok")) return "hianyzas"
  if (path.startsWith("/beallitasok")) return "settings"
  return "home"
}

function setActiveFromRoute() {
  const key = keyFromPath(route.path)
  Object.keys(lista).forEach((k) => (lista[k] = false))
  lista[key] = true

  nextTick(() => {
    const el = navRef.value?.querySelector("li.active")
    moveCircleTo(el)
  })
}

onMounted(async () => {
  await nextTick()

  // induláskor: Home legyen aktív + kör is oda kerüljön
  setActiveFromRoute()

  // ha átméretezed az ablakot, maradjon jó helyen
  window.addEventListener("resize", setActiveFromRoute)
})

watch(
  () => route.path,
  () => setActiveFromRoute()
)
</script>

<template>
<nav ref="navRef">
<ul>
    <li @click="(e) => setActive('orarend', e)" :class="{ active: lista.orarend }">
    <RouterLink to="/orarend">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M8 2v4" />
        <path d="M16 2v4" />
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <path d="M3 10h18" />
        </svg>
    </RouterLink>
    </li>

    <li @click="(e) => setActive('naplo', e)" :class="{ active: lista.naplo }">
    <RouterLink to="/jegyek">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
        </svg>
    </RouterLink>
    </li>

    <li @click="(e) => setActive('home', e)" :class="{ active: lista.home }" id="home">
    <RouterLink to="/">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
        <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        </svg>
    </RouterLink>
    </li>

    <li @click="(e) => setActive('hianyzas', e)" :class="{ active: lista.hianyzas }">
    <RouterLink to="/hianyzasok">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M16 14v2.2l1.6 1" />
        <path d="M16 4h2a2 2 0 0 1 2 2v.832" />
        <path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h2" />
        <circle cx="16" cy="16" r="6" />
        <rect x="8" y="2" width="8" height="4" rx="1" />
        </svg>
    </RouterLink>
    </li>

    <li @click="(e) => setActive('settings', e)" :class="{ active: lista.settings }">
    <RouterLink to="/beallitasok">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" />
        <circle cx="12" cy="12" r="3" />
        </svg>
    </RouterLink>
    </li>
</ul>

<div ref="circleRef" class="circle"></div>
</nav>

<div class="bg-blur"></div>
</template>

<style scoped>
nav {
    position: fixed;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100vw - 2rem);
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
        padding: 0;
        margin: 0;

        li {
        width: 45px;
        height: 45px;
        position: relative;
        z-index: 2; /* ikon legyen a kör felett */

            svg {
                box-sizing: content-box;
                height: 30px;
                width: 30px;
                color: var(--Carbon-Black);
                transition: all 0.25s ease;
                padding: 7.5px;
                border-radius: 1.25rem;
            }
        }
        
        .active svg {
            color: var(--Bright-Snow);
        }
    }

    .circle {
    width: 45px;
    height: 45px;
    background-color: var(--Carbon-Black);
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 1.25rem;

    position: absolute;
    top: 50%;
    left: 0;

    transform: translate(0, -50%);
    transition: transform 0.25s ease;
    z-index: 1;      /* kör az ikon mögött */
    pointer-events: none;
    }

    .bg-blur {
    width: 100vw;
    height: 3rem;
    background-color: transparent;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 20;
    backdrop-filter: blur(2.5px);
    }
}
</style>