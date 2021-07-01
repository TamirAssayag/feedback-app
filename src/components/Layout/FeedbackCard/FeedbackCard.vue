<template>
  <div class="card suggestions">
    <span class="suggestions__title" @click="$emit('direct')">
      {{ title }}
    </span>

    <div class="suggestions__description">
      {{ description }}
    </div>

    <UIButton color="secondary" uistyle="chip" :elevation="0">
      {{ category }}
    </UIButton>

    <div class="suggestions__bottom--wrapper">
      <UIButton
        :uistyle="userVoted ? 'upvoted' : 'upvote'"
        :elevation="0"
        class="suggestions__btn"
        @click="$emit('onVote')"
      >
        <inlineSvg :src="getImageUrl('shared/icon-arrow-up.svg')"></inlineSvg>
        {{ upvotes }}
      </UIButton>

      <UIButton
        :uistyle="allComments ? 'comments' : 'comments_empty'"
        color="transparent"
        :elevation="0"
        class="suggestions__btn"
      >
        <inlineSvg :src="getImageUrl('shared/icon-comments.svg')"></inlineSvg>
        {{ commentsLength }}
      </UIButton>
    </div>
  </div>
</template>

<script>
import UIButton from "./../UI/UIButton.vue";
import "./FeedbackCard.scss";
export default {
  components: { UIButton },
  props: {
    title: String,
    description: String,
    category: String,
    upvotes: Number,
    allComments: Array,
    commentsLength: null,
    userVoted: Boolean,
  },
};
</script>

<style></style>
