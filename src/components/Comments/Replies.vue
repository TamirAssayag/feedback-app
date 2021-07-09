<template>
  <div class="replies__container">
    <div class="replies__wrapper">
      <div class="replies__user">
        <User
          :image="data.user.image"
          :name="data.user.name"
          :username="data.user.username"
          @onReply="handleExpansion"
        />
      </div>

      <div class="replies__wrapper__content">
        <span class="replying_to">@{{ data.replyingTo }}</span>
        <span class="replies__wrapper__content__text"></span>
        {{ data.content }}
      </div>

      <div class="trash__delete">
        <UIButton
          v-if="data.user.username === user.username"
          :color="'transparent'"
          :elevation="0"
          @click="$emit('onDelete')"
        >
          <v-icon>mdi mdi-delete</v-icon>
        </UIButton>
      </div>

      <div class="replies__reply__expansion">
        <ReplyExpansion
          :username="data.user.username"
          :value="replyShown"
          @click="handleReply"
        />
      </div>
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
  name: "Replies",

  data: () => ({
    replyShown: false,
  }),

  props: {
    data: null,
    commentId: Number,
  },

  methods: {
    ...mapActions({
      addReply: "feedbacks/addReply",
    }),

    handleExpansion() {
      this.replyShown = !this.replyShown;
    },

    handleReply(content) {
      this.addReply({
        reply: content,
        commentId: this.commentId,
        id: this.$route.params.id,
        replyingTo: this.data.user.username,
      });
      this.replyShown = false;
    },
  },
};
</script>

<style></style>
