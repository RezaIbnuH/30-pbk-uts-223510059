import { createRouter, createWebHistory } from 'vue-router'
import TodoApp from '../components/TodoApp.vue'
import PostViewer from '../components/PostViewer.vue'

const routes = [
  { path: '/', redirect: '/todos' },
  { path: '/todos', component: TodoApp },
  { path: '/post', component: PostViewer }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
