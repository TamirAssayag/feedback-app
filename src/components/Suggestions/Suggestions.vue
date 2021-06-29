<template>
  <div class="cards">
    <template v-for="feed in feedbacks">
      <div class="card suggestions" :key="feed.id" v-if="feedbacks.length">
        <span class="suggestions__title">
          {{ feed.title }}
        </span>

        <div class="suggestions__description">
          {{ feed.description }}
        </div>

        <UIButton color="secondary" uistyle="chip" :elevation="0">
          {{ feed.category }}
        </UIButton>

        <div class="suggestions__bottom--wrapper">
          <UIButton
            :uistyle="feed.hasUserUpVoted ? 'upvoted' : 'upvote'"
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
            :uistyle="feed.comments ? 'comments' : 'comments_empty'"
            color="transparent"
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
import { mapActions } from "vuex";
import UIButton from "../Layout/UI/UIButton.vue";
export default {
  components: { UIButton },
  name: "Suggestions",

  data: () => ({}),

  methods: {
    ...mapActions({
      upVoteFeedbackById: "feedbacks/upVoteFeedbackById",
    }),
  },
};
</script>

<style></style>
