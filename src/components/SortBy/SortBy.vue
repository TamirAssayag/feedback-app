<template>
  <div>
    <v-menu
      bottom
      offset-y
      :close-on-content-click="true"
      transition="scroll-y-transition"
      attach
      v-model="rotate"
      :menu-props="{
        top: false,
        offsetY: true,
      }"
    >
      <v-list class="sort_by__dropdown">
        <v-list-item
          v-for="item in items"
          :key="item"
          link
          dense
          @click="selected = item"
        >
          <span> {{ item }}</span>
        </v-list-item>
      </v-list>

      <template v-slot:activator="{ on, attrs }">
        <v-btn
          :ripple="false"
          :elevation="0"
          :bind="attrs"
          v-on="on"
          title="Sort By"
          aria-label="Sort By"
          class="ui-button__sort"
          @click="toggleIconRotation"
        >
          {{ selected }}
          <v-icon
            :class="[
              rotate ? 'mdi-chevron-down rotate' : 'ui-button__sort transition',
            ]"
          >
            mdi-chevron-down
          </v-icon>
        </v-btn>
      </template>
    </v-menu>
  </div>
</template>

<script>
import "./SortBy.scss";
export default {
  name: "SortBy",
  data: () => ({
    selected: "Most Upvotes",
    items: ["Most Upvotes", "Least Upvotes", "Most Comments", "Least Comments"],
    rotate: false,
  }),

  methods: {
    toggleIconRotation() {
      this.rotate = !this.rotate;
    },
  },
};
</script>

<style lang="scss"></style>
