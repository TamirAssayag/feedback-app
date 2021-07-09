<template>
  <div class="filter card">
    <UIButton
      :elevation="0"
      v-for="category in filters"
      :key="category"
      :color="category === selected ? 'primary' : 'secondary'"
      :title="category | capitalize"
      :aria-label="category | capitalize"
      @click="filter(category)"
    >
      {{ category }}
    </UIButton>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import UIButton from "../../Layout/UI/UIButton.vue";
export default {
  components: { UIButton },
  data: () => ({
    filters: ["all", "ui", "ux", "enhancement", "bug", "feature"],
  }),

  computed: {
    ...mapGetters({
      selected: "feedbacks/getFilter",
    }),
  },

  methods: {
    ...mapActions({
      filter: "feedbacks/updateFilter",
    }),
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
