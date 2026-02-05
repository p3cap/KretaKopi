import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ScheduleView from '@/views/ScheduleView.vue'
import GradesView from '@/views/GradesView.vue'
import AbsencesView from '@/views/AbsencesView.vue'
import SettingView from '@/views/SettingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/orarend',
      name: 'orarend',
      component: ScheduleView,
    },
    {
      path: '/jegyek',
      name: 'jegyek',
      component: GradesView,
    },
    {
      path: '/hianyzasok',
      name: 'hianyzasok',
      component: AbsencesView,
    },
    {
      path: '/beallitasok',
      name: 'beallitasok',
      component: SettingView,
    }
    
  ],
})

export default router
