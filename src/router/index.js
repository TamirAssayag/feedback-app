import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Suggestions",
    component: () =>
      import(
        /* webpackChunkName: "Suggestions" */ "@/components/Suggestions/Suggestions.vue"
      ),
  },

  {
    path: "/feedback",
    name: "feedback",
    component: () =>
      import(
        /* webpackChunkName: "Feedback" */ "@/views/Feedback/Feedback.vue"
      ),
    children: [
      {
        path: ":id",
        name: "id",
        children: [],
      },
    ],
  },

  {
    path: "/add",
    name: "add_feedback",
    component: () =>
      import(
        /* webpackChunkName: "AddFeedback" */ "@/components/Suggestions/AddFeedback/AddFeedback.vue"
      ),
  },

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
