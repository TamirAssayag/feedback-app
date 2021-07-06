<template>
  <div class="fb__card">
    <div :class="`tab_color ${color}`" v-if="$route.name === 'roadmap'"></div>

    <div class="suggestions">
      <div class="roadmap__status" v-if="$route.name === 'roadmap'">
        <div :class="`roadmap__status__indicator ${color}`"></div>
        <p :class="`roadmap__status__text ${color}`">{{ feed.status }}</p>
      </div>

      <div class="suggestions__wrapper">
        <div class="suggestions__wrapper__upvote">
          <UIButton
            v-if="$screen.md && $route.name !== 'roadmap'"
            :uistyle="feed.hasUserUpVoted ? 'upvoted' : 'upvote'"
            :elevation="0"
            class="suggestions__btn"
            @click="$emit('onVote')"
          >
            <inlineSvg
              :src="getImageUrl('shared/icon-arrow-up.svg')"
            ></inlineSvg>
            {{ feed.upvotes }}
          </UIButton>
        </div>

        <div class="suggestions__content">
          <span class="suggestions__title" @click="$emit('direct')">
            {{ feed.title }}
          </span>

          <div class="suggestions__description">
            {{ feed.description }}
          </div>

          <UIButton color="secondary" uistyle="chip" :elevation="0">
            {{ feed.category }}
          </UIButton>
        </div>

        <div
          class="suggestions__wrapper__comments"
          v-if="$screen.md && $route.name !== 'roadmap'"
        >
          <UIButton
            :uistyle="feed.comments.length ? 'comments' : 'comments_empty'"
            color="transparent"
            :elevation="0"
            class="suggestions__btn"
          >
            <inlineSvg
              :src="getImageUrl('shared/icon-comments.svg')"
            ></inlineSvg>
            {{ feed.totalComments }}
          </UIButton>
        </div>
      </div>

      <div class="suggestions__bottom--wrapper" v-if="!$screen.md">
        <UIButton
          :uistyle="feed.hasUserUpVoted ? 'upvoted' : 'upvote'"
          :elevation="0"
          class="suggestions__btn upvote"
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
