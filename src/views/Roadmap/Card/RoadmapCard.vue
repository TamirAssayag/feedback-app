<template>
  <div class="roadmap__card">
    <div :class="`tab_color ${color}`" v-if="$route.name === 'roadmap'"></div>

    <div class="roadmap">
      <div class="roadmap__status">
        <div :class="`roadmap__status__indicator ${color}`"></div>
        <p :class="`roadmap__status__text ${color}`">{{ feed.status }}</p>
      </div>

      <div class="roadmap__wrapper">
        <div class="roadmap__content">
          <span class="roadmap__title" @click="$emit('direct')">
            {{ feed.title }}
          </span>

          <div class="roadmap__description">
            {{ feed.description }}
          </div>

          <UIButton color="secondary" uistyle="chip" :elevation="0">
            {{ feed.category }}
          </UIButton>
        </div>
      </div>

      <div class="roadmap__bottom--wrapper">
        <UIButton
          :uistyle="feed.hasUserUpVoted ? 'upvoted' : 'upvote'"
          :elevation="0"
          class="roadmap__btn"
          @click="$emit('onVote')"
        >
          <inlineSvg :src="getImageUrl('shared/icon-arrow-up.svg')"></inlineSvg>
          {{ feed.upvotes }}
        </UIButton>

        <UIButton
          :uistyle="feed.comments.length ? 'comments' : 'comments_empty'"
          color="transparent"
          :elevation="0"
          class="suggestions__btn"
        >
          <inlineSvg :src="getImageUrl('shared/icon-comments.svg')"></inlineSvg>
          {{ feed.totalComments }}
        </UIButton>
      </div>
    </div>
  </div>
</template>

<script>
import UIButton from "../../../components/Layout/UI/UIButton.vue";
import "./RoadmapCard.scss";
export default {
  components: { UIButton },
  props: {
    color: {
      type: String,
    },
    feed: Object,
    status: String,
  },
};
</script>

<style></style>
