<template>
  <div class="card add_comment" style="width: 100%">
    <h3 class="mb-6">Add Comment</h3>
    <v-textarea
      no-resize
      dense
      filled
      required
      background-color="input"
      v-model="content"
      placeholder="Type your comment here"
      :counter="250"
      maxlength="250"
      :error-messages="commentErrors"
      @focus="$v.content.$reset()"
      @blur="$v.content.$touch()"
    ></v-textarea>

    <div class="bottom_add_comment">
      <UIButton
        class="post_comment mt-4"
        :uistyle="'post__comment'"
        @click="submit"
      >
        Post Comment
      </UIButton>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import FormValidations from "@/mixins/FormValidations";
import UIButton from "../Layout/UI/UIButton.vue";
export default {
  components: { UIButton },
  name: "AddComment",

  mixins: [validationMixin, FormValidations],

  validations: {
    content: { required },
  },

  data: () => ({
    content: null,
  }),

  methods: {
    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) return;
      this.$emit("onSubmit", this.content);
      this.content = "";
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/colors.scss";
.card {
  &.add_comment {
    .v-text-field {
      &.v-text-field--enclosed .v-text-field__details {
        display: flex;
        align-items: center;
        flex-direction: column;
        position: absolute !important;
        bottom: -3rem;

        .v-counter {
          margin: 0 !important;
          color: $text_primary !important;
          width: 100% !important;
          padding: 0 !important;
        }
      }
    }
  }
  .v-textarea {
    min-height: 88px !important;
  }
}

.bottom_add_comment {
  display: flex;
  width: 100%;

  .post_comment {
    font-size: 13px !important;
    margin-left: auto;
  }
}
</style>
