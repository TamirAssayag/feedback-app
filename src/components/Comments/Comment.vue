<template>
  <div class="comment">
    <User
      :image="data.user.image"
      :name="data.user.name"
      :username="data.user.username"
      @onReply="handleExpansion(data)"
    />

    <p class="comment__content">
      {{ data.content }}
    </p>

    <ReplyExpension
      :username="data.user.username"
      :value="hasReplyTextArea"
      @click="handleReply"
    />

    <div class="comment__delete">
      <UIButton
        v-if="data.user === user"
        :color="'transparent'"
        :elevation="0"
        @click="
          deleteComment({
            feedbackId: $route.params.id,
            id: data.id,
          })
        "
      >
        <v-icon>mdi mdi-delete</v-icon>
      </UIButton>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import UIButton from "../Layout/UI/UIButton.vue";
import ReplyExpension from "./ReplyExpension.vue";
import User from "./User.vue";
export default {
  components: { User, ReplyExpension, UIButton },

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

    handleExpansion(id) {
      this.hasReplyTextArea = !this.hasReplyTextArea;
      console.log(id);
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
