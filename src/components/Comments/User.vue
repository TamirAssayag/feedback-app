<template>
  <div class="user">
    <v-img
      :src="getImageUrl(`${image}`)"
      max-height="40"
      max-width="40"
      content-class="user_img"
      :alt="`${username}`"
      :title="`${username}`"
    />
    <ul>
      <li class="user__name">
        {{ name }}
      </li>
      <li class="user__username">@{{ username }}</li>
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
@import "@/styles/import";

.user {
  display: flex;
  align-items: center;

  &__name {
    font-size: 13px;
    font-weight: bold;
    color: $dark_blue;
    letter-spacing: -0.18px;
    @include media(">=md") {
      font-size: 14px;
    }
  }

  &__username {
    font-size: 13px;
    color: $text_primary;
    letter-spacing: -0.18px;

    @include media(">=md") {
      font-size: 14px;
    }
  }

  .v-image {
    border-radius: 50%;
  }

  ul {
    margin-left: 1rem;
    @include media(">=md") {
      margin-left: 32px;
    }
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
