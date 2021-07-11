<template>
  <div class="extension_bar">
    <div class="extension_bar__suggestions">
      <InlineSvg :src="getImageUrl('suggestions/icon-suggestions.svg')" />
      <h3>{{ displaySuggestionsStatus() }} Suggestions</h3>
    </div>
    <div class="sort_by">
      <span class="text_extension"> Sort By : </span>
      <SortBy />
    </div>
    <UIButton
      uistyle="feedback"
      aria-label="Add Feedback"
      title="Add Feedback"
      @click="$router.push('/add')"
    >
      + Add Feedback
    </UIButton>
  </div>
</template>

<script>
import SortBy from "../../SortBy/SortBy.vue";
import UIButton from "../UI/UIButton.vue";
export default {
  name: "TabletExtension",
  components: { SortBy, UIButton },

  methods: {
    displaySuggestionsStatus() {
      return this.getStatus("suggestion").length;
    },
  },
};
</script>
