<template>
  <div class="cards">
    <template v-for="feed in feedbacks">
      <FeedbackCard
        :key="feed.id"
        :title="feed.title"
        :description="feed.description"
        :category="feed.category"
        :upvotes="feed.upvotes"
        :allComments="feed.comments"
        :commentsLength="feed.totalComments"
        :userVoted="feed.hasUserUpVoted"
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

  data: () => ({}),
};
</script>

<style></style>
