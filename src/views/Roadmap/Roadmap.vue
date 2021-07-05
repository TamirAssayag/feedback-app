<template>
  <div class="tabs">
    <portal to="layoutNavbar">
      <div class="tabs_bar">
        <v-tabs
          v-model="tab"
          background-color="transparent"
          color="dark_blue"
          grow
          :slider-color="tabColor"
        >
          <v-tab v-for="item in tabItems" :key="item.status">
            {{ item.status }} ({{ displayStatusAmount(item.status) }})
          </v-tab>
        </v-tabs>
      </div>
    </portal>
    <v-fade-transition appear>
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="item in tabItems" :key="item.status">
          <h3>{{ item.status }} ({{ displayStatusAmount(item.status) }})</h3>
          <div class="roadmap__header">
            <p class="roadmap__header__subtitle">
              {{ displayTextByStatus(item.status) }}
            </p>
          </div>
          <div v-for="feed in feedbackByStatus(item.status)" :key="feed.id">
            <FeedbackCard
              :feed="feed"
              :color="feed.status"
              @onVote="upVoteFeedbackById(feed.id)"
              @direct="directToFeedback(feed.id)"
            />
          </div>
        </v-tab-item>
      </v-tabs-items>
    </v-fade-transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FeedbackCard from "@/components/Layout/FeedbackCard/FeedbackCard.vue";
export default {
  components: { FeedbackCard },
  name: "Roadmap",

  data: () => ({
    tab: null,
    tabItems: [
      {
        status: "Planned",
        color: "#f49f85",
      },
      {
        status: "In-Progress",
        color: "#ad1fea",
      },
      {
        status: "Live",
        color: "#62bcfa",
      },
    ],
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  }),

  computed: {
    ...mapGetters({
      getFeedbacksByStatus: "feedbacks/getFeedbacksByStatus",
    }),
    tabColor() {
      return this.tabItems?.[this.tab]?.color;
    },
  },

  methods: {
    displayTextByStatus(item) {
      if (item === "Planned") {
        return "Ideas prioritized for research";
      } else if (item === "In-Progress") {
        return "Currently being developed";
      } else {
        return "Released features";
      }
    },
    feedbackByStatus(status) {
      return this.getFeedbacksByStatus(status.toLowerCase());
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/colors.scss";
.roadmap__header {
  margin-bottom: 1.5rem;

  &__subtitle {
    color: $text_primary;
    font-size: 13px;
  }
}
</style>
