import { createRouter, createWebHistory } from 'vue-router/auto'
import MoviePage from '@/pages/MoviePage.vue'

const routes = [
  { path: '/:id', component: MoviePage, name: 'home', meta: { movieId: '' } },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: MoviePage },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
