<template>
  <div :class="`fb__card sg__${index}`">
    <div :class="`tab_color ${color}`" v-if="checkRoute('roadmap')"></div>

    <div class="suggestions" @click.stop="$emit('direct')">
      <div class="roadmap__status" v-if="checkRoute('roadmap')">
        <div :class="`roadmap__status__indicator ${color}`"></div>
        <p :class="`roadmap__status__text ${color}`">{{ feed.status }}</p>
      </div>

      <div class="suggestions__wrapper">
        <div class="suggestions__wrapper__upvote">
          <UIButton
            v-if="$screen.md && !checkRoute('roadmap')"
            :uistyle="feed.hasUserUpVoted ? 'upvoted' : 'upvote'"
            :elevation="0"
            class="suggestions__btn"
            @clickStop="$emit('onVote')"
          >
            <inlineSvg
              :src="getImageUrl('shared/icon-arrow-up.svg')"
            ></inlineSvg>
            {{ feed.upvotes }}
          </UIButton>
        </div>

        <div class="suggestions__content">
          <span
            class="suggestions__title"
            :aria-label="feed.title"
            :title="feed.title"
          >
            <v-clamp autoresize :max-lines="1" v-if="checkRoute('Suggestions')">
              {{ feed.title }}
            </v-clamp>
            <p v-else>
              {{ feed.title }}
            </p>
          </span>

          <div class="suggestions__description">
            <v-clamp autoresize :max-lines="2" v-if="checkRoute('Suggestions')">
              {{ feed.description }}
            </v-clamp>
            <p v-else>
              {{ feed.description }}
            </p>
          </div>

          <UIButton
            color="secondary"
            uistyle="chip"
            :elevation="0"
            :aria-label="feed.category | capitalize"
            :title="feed.category | capitalize"
          >
            {{ feed.category }}
          </UIButton>
        </div>

        <div
          class="suggestions__wrapper__comments"
          v-if="$screen.md && !checkRoute('roadmap')"
        >
          <UIButton
            :uistyle="feed.comments.length ? 'comments' : 'comments_empty'"
            color="transparent"
            :elevation="0"
            class="suggestions__btn"
            :aria-label="`${feed.comments.length} Comments`"
            :title="`${
              feed.comments.length
                ? feed.comments.length + ' Comments'
                : 'No Comments'
            }`"
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
    index: Number,
  },
};
</script>

<style></style>
