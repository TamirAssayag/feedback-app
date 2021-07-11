<template>
  <div class="roadmap__card">
    <div :class="`tab_color ${color}`"></div>

    <div class="roadmap" @click="$emit('direct')">
      <div class="roadmap__container">
        <div class="roadmap__status">
          <div :class="`roadmap__status__indicator ${color}`"></div>
          <p :class="`roadmap__status__text ${color}`">{{ feed.status }}</p>
        </div>

        <div class="roadmap__wrapper">
          <div class="roadmap__content">
            <span class="roadmap__title" :title="feed.title">
              <v-clamp autoresize :max-lines="1" v-if="checkRoute('roadmap')">
                {{ feed.title }}
              </v-clamp>
              <p v-else>
                {{ feed.title }}
              </p>
            </span>

            <div class="roadmap__description">
              <v-clamp autoresize :max-lines="2" v-if="checkRoute('roadmap')">
                {{ feed.description }}
              </v-clamp>
              <p v-else>
                {{ feed.description }}
              </p>
            </div>

            <UIButton
              color="secondary"
              :aria-label="feed.category | capitalize"
              :title="feed.category | capitalize"
              uistyle="chip"
              :elevation="0"
            >
              {{ feed.category }}
            </UIButton>
          </div>
        </div>

        <div class="roadmap__bottom--wrapper">
          <UIButton
            :uistyle="feed.hasUserUpVoted ? 'upvoted' : 'upvote'"
            :elevation="0"
            class="roadmap__btn"
            @clickStop="$emit('onVote')"
            :title="feed.hasUserUpVoted ? 'Downvote' : 'Upvote'"
            :aria-label="feed.hasUserUpVoted ? 'Downvote' : 'Upvote'"
          >
            <inlineSvg
              :src="getImageUrl('shared/icon-arrow-up.svg')"
            ></inlineSvg>
            {{ feed.upvotes }}
          </UIButton>

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
    </div>
  </div>
</template>

<script>
import UIButton from "@/components/Layout/UI/UIButton.vue";
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
