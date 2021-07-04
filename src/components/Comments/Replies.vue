<template>
  <div>
    <User
      :image="data.user.image"
      :name="data.user.name"
      :username="data.user.username"
      @onReply="handleExpansion"
    />

    <div class="replies__wrapper__content">
      <span class="replying_to">@{{ data.replyingTo }}</span>
      <span class="replies__wrapper__content__text"></span>
      {{ data.content }}
    </div>
    <ReplyExpension :username="data.user.username" :value="replyShown" />
  </div>
</template>

<script>
import ReplyExpension from "./ReplyExpension.vue";
import User from "./User.vue";
export default {
  components: { User, ReplyExpension },
  name: "Replies",

  data: () => ({
    replyShown: false,
  }),

  props: {
    data: null,
  },

  methods: {
    handleExpansion() {
      this.replyShown = !this.replyShown;
    },
  },
};
</script>

<style></style>
