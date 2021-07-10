<template>
  <section>
    <router-view />
    <div v-if="feedback" class="container single-feedback">
      <Navbar :maxHeight="36" notSticky @onBack="goBack">
        <template v-slot:action>
          <UIButton class="ui-button__edit_feedback" @click="editFeedback">
            Edit Feedback
          </UIButton>
        </template>
      </Navbar>

      <v-fade-transition appear>
        <FeedbackCard
          class="mt-6"
          @onVote="upVoteFeedbackById(feedback.id)"
          :feed="feedback"
        />
      </v-fade-transition>

      <section class="card comments">
        <header class="comments__header">
          <h3>{{ feedback.totalComments }} Comments</h3>
        </header>

        <v-expand-transition
          appear
          v-for="(comment, i) in comments"
          :key="comment.id + i"
        >
          <div class="comments__wrapper">
            <Comment :data="comment" :index="i" />

            <div class="replies" v-if="comment.replies">
              <v-expand-transition
                v-for="(reply, index) in comment.replies"
                :key="reply.replyingTo + index"
              >
                <Replies
                  :data="reply"
                  :commentId="comment.id"
                  @onDelete="removeReply(comment.id, index)"
                />
              </v-expand-transition>
            </div>
            <v-divider class="mb-5" v-if="i !== comments.length - 1" />
          </div>
        </v-expand-transition>
      </section>
      <AddComment @onSubmit="handleSubmit" />
    </div>
  </section>
</template>

<script>
import "./Feedback.scss";
import FeedbackCard from "@/components/Layout/FeedbackCard/FeedbackCard.vue";
import Navbar from "@/components/Layout/Navbar/Navbar.vue";
import UIButton from "@/components/Layout/UI/UIButton.vue";
import AddComment from "@/components/Comments/AddComment.vue";
import Comment from "@/components/Comments/Comment.vue";
import Replies from "@/components/Comments/Replies.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    FeedbackCard,
    Navbar,
    UIButton,
    AddComment,
    Comment,
    Replies,
  },
  name: "Feedback",

  data: () => ({
    content: null,
  }),

  computed: {
    ...mapGetters({
      user: "feedbacks/user",
    }),
  },

  methods: {
    ...mapActions({
      addComment: "feedbacks/addComment",
      deleteReply: "feedbacks/deleteReply",
    }),

    editFeedback() {
      this.$router.push({ name: "edit_fb" }).catch((err) => console.log(err));
    },

    removeReply(commentId, index) {
      this.deleteReply({
        feedbackId: this.$route.params.id,
        commentId: commentId,
        index: index,
      });
    },

    handleSubmit(param) {
      this.addComment({
        id: this.$route.params.id,
        comment: param,
      });
    },
  },
};
</script>
