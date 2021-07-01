<template>
  <section v-if="feedback">
    <div :class="`feedback_${feedback.status}`">
      <router-view />

      <Navbar :maxHeight="36" notSticky @onBack="goBack()">
        <template v-slot:action>
          <UIButton class="ui-button__edit_feedback"> Edit Feedback </UIButton>
        </template>
      </Navbar>

      <FeedbackCard
        class="mt-6"
        :title="feedback.title"
        :description="feedback.description"
        :category="feedback.category"
        :upvotes="feedback.upvotes"
        :allComments="feedback.comments"
        :commentsLength="feedback.totalComments"
        :userVoted="feedback.hasUserUpVoted"
        @onVote="upVoteFeedbackById(feedback.id)"
      />

      <section class="card feedback__comments">
        <header class="feedback__comments__header">
          <h3>{{ feedback.totalComments }} Comments</h3>
        </header>
        <v-scroll-y-reverse-transition
          v-for="(comment, i) in comments"
          :key="comment.id + i"
        >
          <div class="comment" v-if="comments">
            <User
              :image="comment.user.image"
              :name="comment.user.name"
              :username="comment.user.username"
              @onReply="handleCommentExpansion(i)"
            />

            <p class="comment__content">
              {{ comment.content }}
            </p>

            <ReplyExpension
              :username="comment.user.username"
              :value="isShown"
            />

            <div class="comment__delete">
              <UIButton
                v-if="comment.user === user"
                :color="'transparent'"
                :elevation="0"
                @click="
                  deleteComment({
                    feedbackId: $route.params.id,
                    id: comment.id,
                  })
                "
              >
                <v-icon>mdi mdi-delete</v-icon>
              </UIButton>
            </div>

            <div class="replies" v-if="comment.replies">
              <div
                class="replies__wrapper"
                v-for="reply in comment.replies"
                :key="reply.content"
              >
                <User
                  :image="reply.user.image"
                  :name="reply.user.name"
                  :username="reply.user.username"
                />

                <div class="replies__wrapper__content">
                  <span class="replying_to">@{{ reply.replyingTo }}</span>
                  <span class="replies__wrapper__content__text"></span>
                  {{ reply.content }}
                </div>
              </div>
            </div>

            <v-divider v-if="i !== comments.length - 1" />
          </div>
        </v-scroll-y-reverse-transition>
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
import User from "@/components/Comments/User.vue";
import AddComment from "@/components/Comments/AddComment.vue";
import { mapActions, mapGetters } from "vuex";
import ReplyExpension from "../../components/Comments/ReplyExpension.vue";

export default {
  components: {
    FeedbackCard,
    Navbar,
    UIButton,
    User,
    AddComment,
    ReplyExpension,
  },
  name: "Feedback",

  data: () => ({
    content: null,
    isShown: null,
    force: null,
  }),

  computed: {
    ...mapGetters({
      user: "feedbacks/user",
    }),
  },

  methods: {
    ...mapActions({
      addComment: "feedbacks/addComment",
      deleteComment: "feedbacks/deleteComment",
    }),

    handleSubmit(param) {
      this.addComment({
        id: this.$route.params.id,
        comment: param,
      });
    },
    handleCommentExpansion(index) {
      this.isShown = index;
    },
  },
};
</script>

<style lang="scss"></style>
