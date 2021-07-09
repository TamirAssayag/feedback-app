!
<template>
  <div class="empty" v-if="!suggestions.length">
    <div class="empty__content">
      <inlineSvg :src="getImageUrl('suggestions/illustration-empty.svg')" />
      <h2 class="empty__title">
        There is no
        <span v-if="filter !== 'all'">{{ filter | capitalize }}</span> feedback
        yet.
      </h2>
      <p class="empty__text">
        Got a suggestion? Found a bug that needs to be squashed? We love hearing
        about new ideas to improve our app.
      </p>
      <UIButton uistyle="feedback" :elevation="0" @click="$router.push('/add')">
        + Add feedback
      </UIButton>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import UIButton from "../Layout/UI/UIButton.vue";
import "./Empty.scss";
export default {
  components: { UIButton },
  name: "Empty",

  computed: {
    ...mapGetters({
      filter: "feedbacks/getFilter",
    }),
  },
};
</script>

<style></style>
