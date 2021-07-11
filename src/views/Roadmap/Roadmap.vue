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
          :ripple="false"
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

          <div class="roadmap__cards">
            <template v-for="feed in feedbackByStatus(item.status)">
              <FeedbackCard
                :key="feed.id"
                :feed="feed"
                :color="feed.status"
                @onVote="upVoteFeedbackById(feed.id)"
                @direct="directToFeedback(feed.id)"
              />
            </template>
          </div>
        </v-tab-item>
      </v-tabs-items>
    </v-fade-transition>
  </div>

  <div v-else class="roadmap__grid">
    <template class="roadmap__item" v-for="(item, index) in tabItems">
      <v-fade-transition appear group :key="item.status">
        <div class="roadmap__header" :key="index">
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
      </v-fade-transition>
    </template>
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
@import "@/styles/import.scss";
.roadmap {
  transition: all 0.2s ease !important;

  &__header {
    margin-bottom: 1.5rem;

    h5 {
      color: $dark_blue;
      font-size: 14px;
    }

    &__subtitle {
      color: $text_primary;
      font-size: 13px;
    }
  }

  &__cards {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  &__grid {
    display: grid;
    place-content: center;
    grid-template-columns: repeat(3, 233px);
    gap: 10px;
  }

  &__card {
    margin: 1.5rem 0;
  }

  @include media(">=md") {
    &__header {
      &__subtitle {
        font-size: 14px;
      }
    }
  }

  @include media(">=lg") {
    height: 272px;
    &__grid {
      gap: 1.875rem;
      grid-template-columns: repeat(3, 358px);
    }
  }
}
</style>
