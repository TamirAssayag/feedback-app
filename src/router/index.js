import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import AddFeedback from "@/components/Suggestions/AddFeedback/AddFeedback.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/add",
    name: "add_feedback",
    component: AddFeedback,
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
  {
    path: "*",
    component: () =>
      import(
        /* webpackChunkName: "Error404" */ "../components/Error404/Error404.vue"
      ),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    window.scrollTo(0, 0);
  },
});

export default router;
