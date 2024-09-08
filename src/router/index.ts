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
      path: '/editor/:articleId?',
      name: 'editor',
      component: () => import("../views/Editor.vue")
    },
    {
      path: '/article/:articleId',
      name: 'article',
      component: () => import("../views/Preview.vue")
    },
    {
      path: "/results",
      name: "results",
      component: () => import("../views/Result.vue")
    },
    {
      path: "/:catchAll(.*)",
      name: "404",
      component: () => import("../views/NotFound.vue")
    },
  ]
});

export default router
