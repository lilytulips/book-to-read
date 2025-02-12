import { createRouter, createWebHistory } from "vue-router"
import useUserStore from "../stores/UserStore.js"

import Home from "../views/Home.vue"

const authGuard = (to, next) => {
  const isLoggedIn = useUserStore().isLoggedIn
  const requiresAuth = to.meta.requiresAuth

  if (isLoggedIn && !requiresAuth) return next({ name: "Home" })
  if (!isLoggedIn && requiresAuth) return next({ name: "Login" })

  return next()
}

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: "/users/sign_in",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: { requiresAuth: false }
  },
  {
    path: "/users/sign_up",
    name: "Signup",
    component: () => import("../views/Signup.vue"),
    meta: { requiresAuth: false }
  },
  {
    path: "/users/logout",
    name: "Logout",
    meta: { requiresAuth: true },
    beforeEnter: async (_to, _from, next) => {
      await useUserStore().logout()
      next({ name: "Login" })
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, _from, next) => {
  authGuard(to, next)
})

export default router
