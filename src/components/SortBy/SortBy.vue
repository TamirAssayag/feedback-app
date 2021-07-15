<template>
  <div class="sort_by">
    <v-select
      class="sort_by__select"
      :items="items"
      height="38px"
      dense
      filled
      hide-details
      v-model="selected"
      @input="
        () => {
          sortBy(selected);
        }
      "
      append-icon="mdi-chevron-down"
      attach
      :menu-props="{
        contentClass: 'sort_by__transparent',
        transition: 'scroll-y-transition',
        top: false,
        offsetY: true,
      }"
      background-color="transparent"
    >
    </v-select>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import "./SortBy.scss";
export default {
  name: "SortBy",

  methods: {
    ...mapActions({
      sortBy: "feedbacks/updateSort",
    }),
  },

  data: () => ({
    selected: "most_upvotes",
    items: [
      {
        text: "Most Upvotes",
        value: "most_upvotes",
      },

      {
        text: "Least Upvotes",
        value: "least_upvotes",
      },

      {
        text: "Most Comments",
        value: "most_comments",
      },

      {
        text: "Least Comments",
        value: "least_comments",
      },
    ],
  }),
};
</script>

<style lang="scss"></style>
