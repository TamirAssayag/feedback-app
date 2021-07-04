<template>
  <div :class="`fb__card`">
    <div :class="`tab_color ${color}`" v-if="$route.name === 'roadmap'"></div>

    <div class="suggestions">
      <div class="roadmap__status" v-if="$route.name === 'roadmap'">
        <div :class="`roadmap__status__indicator ${color}`"></div>
        <p :class="`roadmap__status__text ${color}`">{{ feed.status }}</p>
      </div>

      <span class="suggestions__title" @click="$emit('direct')">
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
import UIButton from "./../UI/UIButton.vue";
import "./FeedbackCard.scss";
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
