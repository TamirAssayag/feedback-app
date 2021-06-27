<template>
  <Navbar
    color="gradient mobile"
    hide-back
    sticky-extension
    elevated
    :zIndex="6"
    :maxHeight="72"
  >
    <template v-slot:action>
      <v-btn
        color="transparent"
        small
        elevation
        fab
        plain
        v-model="isMenuOpen"
        @click="$emit('menuToggle', !isMenuOpen)"
      >
        <inlineSvg :src="getImageUrl(getMenuIcon)"></inlineSvg>
      </v-btn>
    </template>
    <div class="header">
      <h4>Frontend Mentor</h4>
      <h5>Feedback Board</h5>
    </div>
    <template v-slot:extension>
      <div class="extention_bar">
        <div class="sort_by">
          <span class="text_extention"> Sort By: </span>
          <sort-by />
        </div>
        <UIButton color="purple"> + Add Feedback </UIButton>
      </div>
    </template>
  </Navbar>
</template>

<script>
import SortBy from "../SortBy/SortBy.vue";
import Navbar from "./Navbar/Navbar.vue";
import UIButton from "./UI/UIButton.vue";
export default {
  name: "Layout",
  components: { Navbar, UIButton, SortBy },

  model: {
    prop: "isMenuOpen",
    event: "menuToggle",
  },

  props: {
    isMenuOpen: Boolean,
  },

  computed: {
    getMenuIcon() {
      return !this.isMenuOpen
        ? "shared/mobile/icon-hamburger.svg"
        : "shared/mobile/icon-close.svg";
    },
  },
};
</script>

<style lang="scss">
.v-btn {
  &::before {
    background-color: transparent !important;
  }
}

.header {
  padding: 0 1.5rem;
  color: white;

  h4 {
    font-size: 15px;
    letter-spacing: -0.19px;
  }

  h5 {
    font-weight: 500;
    font-size: 13px;
  }
}

.extention_bar {
  background-color: #373f68;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  color: white !important;
}
</style>
