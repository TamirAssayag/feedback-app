<template>
  <v-navigation-drawer fixed v-model="drawerModel" right class="menu__drawer">
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
