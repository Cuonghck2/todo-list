import { createRouter, createWebHistory } from 'vue-router'
import TodoList from '../App.vue'

const routes = [
  {
    path: '/:id?',
    component: () => import('../App.vue')
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { el: to.hash }
    }
    return { x: 0, y: 0 }
  }
})

export default router
