import { createRouter, createWebHistory } from 'vue-router'
import WallView from '../views/WallView.vue'
import InfoView from '../views/InfoView.vue'
import PhotosView from '../views/PhotosView.vue'
import BoxesView from '../views/BoxesView.vue'

const routes = [
  { path: '/', name: 'Wall', component: WallView },
  { path: '/info', name: 'Info', component: InfoView },
  { path: '/photos', name: 'Photos', component: PhotosView },
  { path: '/boxes', name: 'Boxes', component: BoxesView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
