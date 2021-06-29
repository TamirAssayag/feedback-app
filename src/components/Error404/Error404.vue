<template>
  <div class="error_container">
    <h2 class="mb-5">Error</h2>
    <inlineSvg class="error_404" :src="getImageUrl('shared/error-404.svg')" />

    <UIButton class="mt-8" color="secondary" @click="goBack()" :elevation="0">
      <v-icon> mdi-chevron-left</v-icon>
      Go Back
    </UIButton>
  </div>
</template>

<script>
import UIButton from "../Layout/UI/UIButton.vue";
export default {
  components: { UIButton },
  name: "Error404",
};
</script>

<style lang="scss">
@import "@/styles/colors.scss";
.error_container {
  height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: $dark_blue;

  svg.error_404 {
    opacity: 0.5;
    height: 180px;
    .cls-2 {
      fill: $dark_blue;
    }
  }
}
</style>
