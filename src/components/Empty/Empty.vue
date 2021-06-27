!
<template>
  <div class="empty">
    <div class="empty__content">
      <inlineSvg :src="getImageUrl('suggestions/illustration-empty.svg')" />
      <h2 class="empty__title">There is no feedback yet.</h2>
      <p class="empty__text">
        Got a suggestion? Found a bug that needs to be squashed? We love hearing
        about new ideas to improve our app.
      </p>
      <UIButton color="purple" :elevation="0"> + Add feedback </UIButton>
    </div>
  </div>
</template>

<script>
import UIButton from "../Layout/UI/UIButton.vue";
import "./Empty.scss";
export default {
  components: { UIButton },
  name: "Empty",
};
</script>

<style></style>
