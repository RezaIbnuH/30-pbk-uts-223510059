import { createRouter, createWebHistory } from 'vue-router';
import Todos from '../components/Todos.vue';
import Posts from '../components/Posts.vue';
import Albums from '../components/Albums.vue';

const routes = [
  { path: '/', redirect: '/todos' },
  { path: '/todos/:visibility?', component: Todos },
  { path: '/posts/:id?', component: Posts },
  { path: '/albums/:id?', component: Albums },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
