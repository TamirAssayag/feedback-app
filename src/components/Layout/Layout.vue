<template>
  <div>
    <Navbar
      v-if="routeMatches && !$screen.md"
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
        <Extension />
        <portal-target name="layoutNavbar"> </portal-target>
      </template>
    </Navbar>

    <div class="tablet__nav" v-if="$screen.md && !roadmapView && routeMatches">
      <div class="tablet__nav__logo">
        <div class="tablet__nav__logo__wrapper">
          <h4>Frontend Mentor</h4>
          <h5>Feedback Board</h5>
        </div>
      </div>
      <FilterButtons />
      <Rodamap />
    </div>
    <div class="extention_bar__tablet" v-if="$screen.md">
      <Extension />
    </div>
  </div>
</template>

<script>
import FilterButtons from "../Drawer/FilterButtons/FilterButtons.vue";
import Rodamap from "../Drawer/Roadmap/Rodamap.vue";
import Extension from "./Extension/Extension.vue";
import Navbar from "./Navbar/Navbar.vue";
import UIButton from "./UI/UIButton.vue";
export default {
  name: "Layout",
  components: { Navbar, UIButton, FilterButtons, Rodamap, Extension },

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

.tablet__nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  max-width: 768px;
  margin: 1.5rem auto;
  gap: 10px;

  &__logo {
    display: flex;
    min-height: 178px;
    width: 223px;
    border-radius: 10px;
    background-image: url("./../../assets/suggestions/tablet/background-header.png");
    padding: 1.5rem;

    &__wrapper {
      h4 {
        font-size: 20px;
      }

      h5 {
        font-size: 15px;
        font-weight: normal;
      }

      color: white;
      margin-top: auto;
    }
  }
}
</style>
