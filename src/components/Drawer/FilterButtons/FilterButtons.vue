<template>
  <div class="filter card">
    <UIButton
      :elevation="0"
      v-for="category in filters"
      :key="category"
      :color="category === selected ? 'primary' : 'secondary'"
      :uistyle="''"
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
import "./FilterButtons.scss";
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

<style lang="scss"></style>
