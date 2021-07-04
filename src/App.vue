<template>
  <v-app>
    <Layout v-model="isMenuOpen" />
    <Drawer v-model="isMenuOpen" />
    <router-view />
  </v-app>
</template>

<script>
import "./styles/app.scss";
import { mapActions } from "vuex";
import data from "@/json/data.json";
import Layout from "./components/Layout/Layout.vue";
import Drawer from "./components/Drawer/Drawer.vue";
export default {
  components: { Layout, Drawer },
  name: "App",

  methods: {
    ...mapActions({
      setFeedbacks: "feedbacks/setFeedbacks",
      setCurrentUser: "feedbacks/setCurrentUser",
    }),
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },

  data: () => ({
    isMenuOpen: false,
  }),

  mounted() {
    if (localStorage.getItem("feedbacks")) {
      this.setFeedbacks(JSON.parse(localStorage.getItem("feedbacks")));
    } else {
      this.setFeedbacks(data.productRequests);
    }

    if (localStorage.getItem("currentUser")) {
      this.setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
    } else {
      this.setCurrentUser(data.currentUser);
    }
  },
};
</script>
