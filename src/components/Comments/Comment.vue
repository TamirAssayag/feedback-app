<template>
  <div class="comment">
    <User
      :image="data.user.image"
      :name="data.user.name"
      :username="data.user.username"
      @onReply="handleExpansion"
    />

    <p class="comment__content">
      {{ data.content }}
    </p>

    <ReplyExpansion
      :username="data.user.username"
      :value="hasReplyTextArea"
      @click="handleReply"
    />

    <div class="trash__delete">
      <UIButton
        v-if="data.user.username === user.username"
        :color="'transparent'"
        :elevation="0"
        @click="handleDeleteComment"
      >
        <v-icon>mdi mdi-delete</v-icon>
      </UIButton>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import UIButton from "../Layout/UI/UIButton.vue";
import ReplyExpansion from "./ReplyExpansion.vue";
import User from "./User.vue";
export default {
  components: { User, ReplyExpansion, UIButton },

  data: () => ({
    hasReplyTextArea: false,
    content: null,
  }),

  props: {
    data: null,
  },

  methods: {
    ...mapActions({
      deleteComment: "feedbacks/deleteComment",
      addReply: "feedbacks/addReply",
    }),

    handleExpansion() {
      this.hasReplyTextArea = !this.hasReplyTextArea;
    },

    handleDeleteComment() {
      this.deleteComment({
        feedbackId: this.$route.params.id,
        id: this.data.id,
      });
    },

    handleReply(content) {
      this.addReply({
        reply: content,
        commentId: this.data.id,
        id: this.$route.params.id,
        replyingTo: this.data.user.username,
      });
      this.hasReplyTextArea = false;
    },
  },
};
</script>

<style></style>
