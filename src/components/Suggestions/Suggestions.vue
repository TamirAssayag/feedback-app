<template>
  <section class="suggestions__view">
    <router-view />
    <v-fade-transition appear>
      <v-overlay z-index="55" color="white" :opacity="1" v-if="newFeedback" />
    </v-fade-transition>
    <SuggestionsList v-if="suggestions.length" />
    <Empty v-else />
  </section>
</template>

<script>
import Empty from "../Empty/Empty.vue";
import SuggestionsList from "./SuggestionsList.vue";
export default {
  components: { SuggestionsList, Empty },
  name: "Suggestions",

  computed: {
    newFeedback() {
      return this.$route.name === "new_fb";
    },
  },
};
</script>
