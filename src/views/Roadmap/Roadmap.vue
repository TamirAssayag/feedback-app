<template>
  <div class="tabs" v-if="!$screen.md">
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
              {{ item.text }}
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

  <div v-else class="container">
    <div class="roadmap__grid">
      <div class="roadmap__items" v-for="item in tabItems" :key="item.status">
        <div class="roadmap__header">
          <h5>{{ item.status }} ({{ displayStatusAmount(item.status) }})</h5>
          <p class="roadmap__header__subtitle">
            {{ item.text }}
          </p>
        </div>
        <div v-for="feed in feedbackByStatus(item.status)" :key="feed.id">
          <RoadmapCard
            :feed="feed"
            :color="feed.status"
            @onVote="upVoteFeedbackById(feed.id)"
            @direct="directToFeedback(feed.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FeedbackCard from "@/components/Layout/FeedbackCard/FeedbackCard.vue";
import RoadmapCard from "./Card/RoadmapCard.vue";
export default {
  components: { FeedbackCard, RoadmapCard },
  name: "Roadmap",

  data: () => ({
    tab: null,
    tabItems: [
      {
        status: "Planned",
        text: "Ideas prioritized for research",
        color: "#f49f85",
      },
      {
        status: "In-Progress",
        text: "Currently being developed",
        color: "#ad1fea",
      },
      {
        status: "Live",
        text: "Released features",
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
    feedbackByStatus(status) {
      return this.getFeedbacksByStatus(status.toLowerCase());
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/colors.scss";
@import "@/styles/import";
.roadmap__header {
  margin-bottom: 1.5rem;

  h5 {
    color: $dark_blue;
    font-size: 14px;
  }

  &__subtitle {
    color: $text_primary;
    font-size: 13px;

    @include media(">=md") {
      font-size: 14px;
    }
  }
}

.roadmap__grid {
  display: grid;
  place-content: center;
  grid-template-columns: repeat(3, 233px);
  gap: 10px;
}
</style>
