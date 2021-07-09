<template>
  <div class="filter card">
    <UIButton
      :elevation="0"
      v-for="value in Object.keys(buttons)"
      :key="value"
      :color="value === selected ? 'primary' : 'secondary'"
      :title="value | capitalize"
      :aria-label="value | capitalize"
      @click="selectCategory(value)"
    >
      {{ value }}
    </UIButton>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import UIButton from "../../Layout/UI/UIButton.vue";
export default {
  components: { UIButton },
  data: () => ({
    buttons: {
      all: false,
      ui: false,
      ux: false,
      enhancement: false,
      bug: false,
      feature: false,
    },
    selected: "all",
  }),

  methods: {
    ...mapActions({
      filter: "feedbacks/updateFilter",
    }),

    selectCategory(value) {
      this.selected = value;
      this.filter(value);
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/colors.scss";
@import "@/styles/import.scss";
.filter {
  .ui-button {
    &__primary {
      &:nth-of-type(2),
      &:nth-of-type(3) {
        text-transform: uppercase !important;
      }
    }
    &__secondary {
      &:nth-of-type(2),
      &:nth-of-type(3) {
        text-transform: uppercase !important;
      }
      &:active,
      &:hover {
        color: #f2f4fe !important;
        background-color: $blue-hover !important;
      }
    }
  }
  @include media(">=lg") {
    width: 255px;
    min-height: 166px;
  }
}
</style>
