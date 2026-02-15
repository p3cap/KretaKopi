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
      redirect: '/student'
    },
    {
      path: '/student',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/student/orarend',
      name: 'orarend',
      component: ScheduleView,
    },
    {
      path: '/student/jegyek',
      name: 'jegyek',
      component: GradesView,
    },
    {
      path: '/student/hianyzasok',
      name: 'hianyzasok',
      component: AbsencesView,
    },
    {
      path: '/student/beallitasok',
      name: 'beallitasok',
      component: SettingView,
    },
    { // teacher side protecion to be implemented
      path: '/teacher',
      component: () => import('@/views/teacher/TeacherDashboard.vue'),
      meta: { requiresRole: 'teacher' },
      children: [
        { path: '', redirect: '/teacher/dashboard' },
        { path: 'dashboard', component: () => import('@/views/teacher/TeacherDashboard.vue') }
      ]
    },
    
  ],
})

export default router
