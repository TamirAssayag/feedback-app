<template>
  <section class="suggestions__view">
    <router-view />
    <SuggestionsList v-if="feedbacks.length" />
    <Empty v-else />
  </section>
</template>

<script>
import Empty from "../Empty/Empty.vue";
import SuggestionsList from "./SuggestionsList.vue";
export default {
  components: { SuggestionsList, Empty },
  name: "Suggestions",
};
</script>
