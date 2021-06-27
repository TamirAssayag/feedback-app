<template>
  <div>
    <Suggestions />
    <Empty />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Empty from "../components/Empty/Empty.vue";
import Suggestions from "../components/Suggestions/Suggestions.vue";
export default {
  components: { Suggestions, Empty },
  name: "Home",

  ...mapGetters({
    feedbacks: "feedbacks/getFeedbacks",
  }),
};
</script>
