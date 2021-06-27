<template>
  <div class="card">
    <UIButton
      :elevation="0"
      v-for="button in buttons"
      :key="button"
      :color="button === selected ? 'primary' : 'secondary'"
      @click="selected = button"
    >
      {{ button }}
    </UIButton>
  </div>
</template>

<script>
import UIButton from "../../Layout/UI/UIButton.vue";
export default {
  components: { UIButton },
  data: () => ({
    buttons: ["All", "UI", "UX", "Enhancement", "Bug", "Feature"],
    selected: "All",
  }),
};
</script>

<style></style>
