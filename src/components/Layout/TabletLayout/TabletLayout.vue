<template>
  <div>
    <TabletNavbar v-if="display" />
    <TabletExtension v-if="display" />
    <div class="extension_bar__tablet">
      <Extension v-if="checkRoute('roadmap')" />
    </div>
  </div>
</template>

<script>
import Extension from "../Extension/Extension.vue";
import TabletExtension from "./TabletExtension.vue";
import TabletNavbar from "./TabletNavbar.vue";
export default {
  components: { TabletNavbar, TabletExtension, Extension },
  name: "TabletLayout",

  computed: {
    display() {
      return (
        this.$screen.md &&
        !this.$screen.lg &&
        !this.checkRoute("roadmap") &&
        !this.checkRoute("id") &&
        !this.checkRoute("edit_fb")
      );
    },
  },
};
</script>

<style></style>
