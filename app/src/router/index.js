import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/pages/HomePage.vue'

const routes = [
  {
    path: '/:lang?',
    component: HomePage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
