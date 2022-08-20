import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'

const routes = [
    {
        path: '/:lang?',
        component: Home
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
