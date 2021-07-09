<template>
  <div class="extension">
    <div class="extension_bar__roadmap">
      <div class="extension_bar__roadmap__content">
        <Navbar
          :maxHeight="36"
          notSticky
          @onBack="goBack"
          :backColor="'white'"
        />
        <h3>Roadmap</h3>
      </div>
      <UIButton uistyle="feedback" @click="$router.push('/add')">
        + Add Feedback
      </UIButton>
    </div>
  </div>
</template>

<script>
import "./Extension.scss";
import UIButton from "../UI/UIButton.vue";
import { mapGetters } from "vuex";
import Navbar from "../Navbar/Navbar.vue";
export default {
  components: { UIButton, Navbar },
  name: "Extension",

  computed: {
    ...mapGetters({
      getStatus: "feedbacks/getStatus",
    }),
    routeMatches() {
      return (
        !this.roadmapView &&
        this.$route.name !== "id" &&
        this.$route.name !== "edit_fb"
      );
    },
  },
};
</script>

<style lang="scss"></style>
