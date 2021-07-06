<template>
  <div class="container cards">
    <template v-for="feed in suggestions">
      <FeedbackCard
        :key="feed.id"
        :feed="feed"
        @onVote="upVoteFeedbackById(feed.id)"
        @direct="directToFeedback(feed.id)"
      />
    </template>
  </div>
</template>

<script>
import FeedbackCard from "@/components/Layout/FeedbackCard/FeedbackCard.vue";
export default {
  components: { FeedbackCard },
  name: "SuggestionList",
};
</script>

<style></style>
