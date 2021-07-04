import Vue from "vue";
import VueRouter from "vue-router";
import Roadmap from ".././views/Roadmap/Roadmap.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Suggestions",
    component: () =>
      import(
        /* webpackChunkName: "Suggestions" */ "@/components/Suggestions/Suggestions.vue"
      ),
    children: [
      {
        path: "/add",
        name: "new_fb",
        component: () =>
          import(
            /* webpackChunkName: "AddFeedback" */ "@/components/Suggestions/AddFeedback/AddFeedback.vue"
          ),
      },
    ],
  },

  {
    path: "/roadmap",
    name: "roadmap",
    component: Roadmap,
  },

  {
    path: "/feedback",
    name: "feedback",
    component: { template: `<router-view />` },
    children: [
      {
        path: ":id",
        name: "id",
        component: () =>
          import(
            /* webpackChunkName: "Feedback" */ "@/views/Feedback/Feedback.vue"
          ),
        children: [
          {
            path: "edit",
            name: "edit_fb",
            component: () =>
              import(
                /* webpackChunkName: "AddFeedback" */ "@/components/Suggestions/AddFeedback/AddFeedback.vue"
              ),
          },
        ],
      },
    ],
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
