<template>
  <Navbar
    v-if="routeMatches"
    :color="!roadmapView ? 'gradient mobile' : 'sticky'"
    hide-back
    sticky-extension
    elevated
    :zIndex="6"
    :maxHeight="!roadmapView ? 72 : 100"
  >
    <template v-slot:action>
      <v-btn
        v-if="!roadmapView"
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

      <div class="action__roadmap" v-else>
        <UIButton
          uistyle="feedback"
          :elevation="0"
          @click="$router.push('/add')"
        >
          + Add Feedback
        </UIButton>
      </div>
    </template>

    <div class="header" v-if="!roadmapView">
      <h4>Frontend Mentor</h4>
      <h5>Feedback Board</h5>
    </div>

    <template v-slot:back v-if="roadmapView">
      <div class="header">
        <div class="goback">
          <InlineSvg
            :src="getImageUrl('shared/icon-arrow-left.svg')"
            aria-label="Go Back"
            fill="transparent"
          />
          <div class="navbar__icon__text" @click="goBack()">Go Back</div>
        </div>
        <h3>Roadmap</h3>
      </div>
    </template>

    <template v-slot:extension>
      <div class="extention_bar" v-if="!roadmapView">
        <div class="sort_by">
          <span class="text_extention"> Sort By: </span>
          <SortBy />
        </div>
        <UIButton uistyle="feedback" @click="$router.push('/add')">
          + Add Feedback
        </UIButton>
      </div>
      <portal-target name="layoutNavbar"> </portal-target>
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
    routeMatches() {
      return this.$route.name !== "id" && this.$route.name !== "edit_fb";
    },
    roadmapView() {
      return this.$route.name === "roadmap";
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/colors.scss";
.v-btn {
  &::before {
    background-color: transparent !important;
  }
}

.header {
  padding: 0 1.5rem;
  color: white;

  .goback {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 3px;
    cursor: pointer;

    svg {
      path {
        stroke: white !important;
      }
    }

    .navbar__icon__text {
      font-weight: 500;
      color: white !important;
    }
  }

  h3 {
    font-size: 18px;
    color: white;
  }

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

  .ui-button__feedback {
    margin: 0;
  }
}

.tabs_bar {
  background-color: $light-bg;
  height: 3.75rem;

  .v-tab {
    font-size: 13px;
    font-weight: bold;
    text-transform: capitalize;
    letter-spacing: -0.18px;
    border-bottom: 0.1rem solid #8c92b3;
  }

  .v-tabs {
    &-bar.v-item-group > * {
      height: 3.75rem !important;
    }
  }
}

.action__roadmap {
  padding-right: 1.5rem;

  .ui-button__feedback {
    margin: 0;
  }
}
</style>
