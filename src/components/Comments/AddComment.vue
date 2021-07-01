<template>
  <div class="card" style="width: 100%">
    <h3 class="mb-6">Add Comment</h3>
    <v-textarea
      no-resize
      dense
      filled
      required
      auto-grow
      background-color="input"
      v-model="content"
    ></v-textarea>

    <div class="bottom_add_comment">
      <UIButton class="post_comment mt-4" :uistyle="'feedback'" @click="submit">
        Post Comment
      </UIButton>
    </div>
  </div>
</template>

<script>
import UIButton from "../Layout/UI/UIButton.vue";
export default {
  components: { UIButton },
  name: "AddComment",

  data: () => ({
    content: null,
  }),

  methods: {
    submit() {
      this.$emit("onSubmit", this.content);
      this.content = "";
    },
  },
};
</script>

<style lang="scss">
.bottom_add_comment {
  display: flex;
  width: 100%;

  .post_comment {
    font-size: 13px !important;
    margin-left: auto;
  }
}
</style>
