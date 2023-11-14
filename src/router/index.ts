import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "SchedMain",
      component: () => import("../views/ScheduleMain.vue")
    }
  ]
});

export default router;
