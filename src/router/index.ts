import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/index"
    },
    {
      path: '/index',
      name: 'home',
      component: () => import("../views/Main.vue")
    },
    {
      path: '/user',
      name: 'user',
      component: () => import("../views/User.vue")
    },
    {
      path: '/editor',
      name: 'editor',
      component: () => import("../views/Editor.vue")
    },
    {
      path: '/article',
      name: 'article',
      component: () => import("../views/Preview.vue")
    },
  ]
});

export default router
