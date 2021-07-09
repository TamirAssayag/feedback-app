<template>
  <section class="suggestions__view">
    <router-view />
    <v-fade-transition appear>
      <v-overlay z-index="55" color="input" :opacity="1" v-if="newFeedback" />
    </v-fade-transition>
    <SuggestionsList />
  </section>
</template>

<script>
// import Empty from "../Empty/Empty.vue";
import SuggestionsList from "./SuggestionsList.vue";
export default {
  components: { SuggestionsList },
  name: "Suggestions",

  computed: {
    newFeedback() {
      return this.checkRoute("new_fb");
    },
  },
};
</script>
