<template>
  <div class="feedback__comments__user">
    <v-img
      :src="getImageUrl(`${image}`)"
      max-height="40"
      max-width="40"
      content-class="user_img"
      :alt="`${username}`"
      :title="`${username}`"
    />
    <ul>
      <li class="feedback__comments__user-name">
        {{ name }}
      </li>
      <li class="feedback__comments__username">@{{ username }}</li>
    </ul>
    <span class="reply" @click="$emit('onReply')">Reply</span>
  </div>
</template>
<script>
export default {
  name: "User",

  props: {
    image: String,
    name: String,
    username: String,
  },
};
</script>

<style lang="scss">
@import "@/styles/colors.scss";
.feedback__comments {
  &__user {
    display: flex;
    align-items: center;
    .v-image {
      border-radius: 50%;
    }

    ul {
      margin-left: 1rem;
    }

    &-name {
      font-size: 13px;
      font-weight: bold;
      color: $dark_blue;
      letter-spacing: -0.18px;
    }
  }

  &__username {
    font-size: 13px;
    color: $text_primary;
    letter-spacing: -0.18px;
  }

  .reply {
    font-size: 13px;
    color: $blue;
    font-weight: 600;
    margin-left: auto;
    cursor: pointer;
  }
}
</style>
