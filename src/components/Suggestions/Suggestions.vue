<template>
  <div>
    <template v-for="feed in feedbacks">
      <div class="card suggestions" :key="feed.id" v-if="feedbacks.length">
        <span class="suggestions__title">
          {{ feed.title }}
        </span>

        <div class="suggestions__description">
          {{ feed.description }}
        </div>

        <UIButton color="chip" :elevation="0">
          {{ feed.category }}
        </UIButton>

        <div class="suggestions__bottom--wrapper">
          <UIButton
            :color="feed.hasUserUpVoted ? 'upvoted' : 'upvote'"
            :elevation="0"
            class="suggestions__btn"
            @click="upVoteFeedbackById(feed.id)"
          >
            <inlineSvg
              :src="getImageUrl('shared/icon-arrow-up.svg')"
            ></inlineSvg>
            {{ feed.upvotes }}
          </UIButton>

          <UIButton
            :color="feed.comments ? 'comments' : 'comments_empty'"
            :elevation="0"
            class="suggestions__btn"
          >
            <inlineSvg
              :src="getImageUrl('shared/icon-comments.svg')"
            ></inlineSvg>
            {{ feed.comments ? feed.comments.length : 0 }}
          </UIButton>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import "./Suggestions.scss";
import { mapActions, mapGetters } from "vuex";
import UIButton from "../Layout/UI/UIButton.vue";
export default {
  components: { UIButton },
  name: "Suggestions",

  data: () => ({}),

  computed: {
    ...mapGetters({
      feedbacks: "feedbacks/getFeedbacks",
    }),
  },
  methods: {
    ...mapActions({
      upVoteFeedbackById: "feedbacks/upVoteFeedbackById",
    }),
  },
};
</script>

<style></style>
