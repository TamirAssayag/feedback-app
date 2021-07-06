<template>
  <div class="extension">
    <div class="extension_bar" v-if="routeMatches">
      <div class="extension_bar__suggestions" v-if="$screen.md">
        <InlineSvg :src="getImageUrl('suggestions/icon-suggestions.svg')" />
        <h3>{{ displaySuggestionsStatus() }} Suggestions</h3>
      </div>
      <div class="sort_by">
        <span class="text_extension"> Sort By: </span>
        <SortBy />
      </div>
      <UIButton uistyle="feedback" @click="$router.push('/add')">
        + Add Feedback
      </UIButton>
    </div>

    <div class="extension_bar__roadmap" v-if="$screen.md && roadmapView">
      <div class="extension_bar__roadmap__content">
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
      <UIButton uistyle="feedback" @click="$router.push('/add')">
        + Add Feedback
      </UIButton>
    </div>
  </div>
</template>

<script>
import "./Extension.scss";
import SortBy from "../../SortBy/SortBy.vue";
import UIButton from "../UI/UIButton.vue";
import { mapGetters } from "vuex";
export default {
  components: { SortBy, UIButton },
  name: "Extension",

  computed: {
    ...mapGetters({
      getStatus: "feedbacks/getStatus",
    }),
    roadmapView() {
      return this.$route.name === "roadmap";
    },
    routeMatches() {
      return (
        !this.roadmapView &&
        this.$route.name !== "id" &&
        this.$route.name !== "edit_fb"
      );
    },
  },
  methods: {
    displaySuggestionsStatus() {
      return this.getStatus("suggestion").length;
    },
  },
};
</script>

<style lang="scss"></style>
