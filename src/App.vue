<template>
  <v-app>
    <MobileLayout v-model="isMenuOpen" v-if="!$screen.md" />
    <TabletLayout v-if="$screen.md" />
    <Drawer v-model="isMenuOpen" />
    <router-view />
    <footer>
      <p class="attribution">
        Challenge by
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank"
          >Frontend Mentor</a
        >. Coded by <a href="#">Tamir Assayag</a>.
      </p>
    </footer>
  </v-app>
</template>

<script>
import "./styles/app.scss";
import { mapActions } from "vuex";
import data from "@/json/data.json";
import Drawer from "./components/Drawer/Drawer.vue";
import MobileLayout from "./components/Layout/MobileLayout/MobileLayout.vue";
import TabletLayout from "./components/Layout/TabletLayout/TabletLayout.vue";
export default {
  components: { MobileLayout, Drawer, TabletLayout },
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

<style lang="scss">
@import "@/styles/colors.scss";

footer {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 75px;
  opacity: 0.3;
  margin: auto auto 0;

  .attribution {
    color: black !important;
    font-size: 13px;

    a {
      color: $text_primary !important;
    }
  }
}
</style>
