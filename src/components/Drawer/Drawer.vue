<template>
  <v-navigation-drawer
    fixed
    v-model="drawerModel"
    right
    class="menu__drawer"
    v-if="routeMatches"
  >
    <FilterButtons />
    <Rodamap />
  </v-navigation-drawer>
</template>

<script>
import FilterButtons from "./FilterButtons/FilterButtons.vue";
import Rodamap from "./Roadmap/Rodamap.vue";
export default {
  name: "Drawer",
  components: { Rodamap, FilterButtons },
  props: {
    value: Boolean,
  },

  computed: {
    routeMatches() {
      return this.$route.name !== "id" && this.$route.name !== "edit_fb";
    },
    drawerModel: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/colors.scss";
.menu__drawer {
  margin-top: 72px;
  align-items: center !important;
  background-color: $lighter-bg !important;
  box-shadow: none !important;
}
</style>
