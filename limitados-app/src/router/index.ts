// Composables
import { createRouter, createWebHistory } from "vue-router";
import { authGuard } from "./guards/auth.guard";
import { unauthenticatedGuard } from "./guards/unauthenticated.guard";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Home",
        meta: { requiresAuth: true },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
      },
      {
        path: "login",
        name: "Login",
        meta: { requiresUnauthenticated: true },
        component: () => import("@/views/Login.vue"),
      },
      {
        path: "signup",
        name: "Cadastro",
        meta: { requiresUnauthenticated: true },
        component: () => import("@/views/Signup.vue"),
      },
      {
        path: "perfil",
        name: "Perfil",
        meta: { requiresAuth: true },
        component: () => import("@/views/Profile.vue"),
      },
      {
        path: "grupos",
        name: "Grupos",
        meta: { requiresAuth: true },
        component: () => import("@/views/group/Groups.vue"),
      },
      {
        path: "grupos/:id",
        name: "Despesas do grupo",
        meta: { requiresAuth: true },
        component: () => import("@/views/group/GroupExpenses.vue"),
      },
      {
        path: "despesas/:id",
        name: "Detalhes da despesa",
        meta: { requiresAuth: true },
        component: () => import("@/views/Expense.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresUnauthenticated)) {
    return unauthenticatedGuard(to, from, next);
  } else {
    return next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    return authGuard(to, from, next);
  } else {
    return next();
  }
});

export default router;
