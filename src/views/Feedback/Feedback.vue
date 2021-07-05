<template>
  <section>
    <router-view />
    <div v-if="feedback" :class="`container feedback_${feedback.status}`">
      <Navbar :maxHeight="36" notSticky @onBack="goBack">
        <template v-slot:action>
          <UIButton class="ui-button__edit_feedback" @click="editFeedback">
            Edit Feedback
          </UIButton>
        </template>
      </Navbar>
      <FeedbackCard
        class="mt-6"
        :feed="feedback"
        @onVote="upVoteFeedbackById(feedback.id)"
      />
      <section class="card comments">
        <header class="comments__header">
          <h3>{{ feedback.totalComments }} Comments</h3>
        </header>

        <v-expand-transition
          v-for="(comment, i) in comments"
          :key="comment.id + i"
        >
          <div class="comments__wrapper">
            <Comment :data="comment" />

            {{ comment.replies }}

            <div class="replies" v-if="comment.replies">
              <div
                v-for="(reply, index) in comment.replies"
                :key="reply.replyingTo + index"
              >
                <div class="replies__wrapper">
                  <Replies
                    :data="reply"
                    :commentId="comment.id"
                    @onDelete="
                      deleteReply({
                        feedbackId: $route.params.id,
                        commentId: comment.id,
                        index: index,
                      })
                    "
                  />
                </div>
              </div>
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
import { mapActions, mapGetters } from "vuex";
import Comment from "../../components/Comments/Comment.vue";
import Replies from "../../components/Comments/Replies.vue";

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

    handleDeleteReply(reply, index) {
      reply.splice(index, 1);
    },

    editFeedback() {
      this.$router.push({ name: "edit_fb" }).catch((err) => console.log(err));
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

<style lang="scss"></style>
