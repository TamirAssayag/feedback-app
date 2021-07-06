<template>
  <v-scroll-y-transition appear hide-on-leave>
    <div class="reply__expansion" v-if="value">
      <v-textarea
        v-if="value"
        required
        no-resize
        :label="`Replying to @${username}`"
        v-model="content"
        :error-messages="replyErrors"
        @focus="$v.content.$reset()"
        @blur="$v.content.$touch()"
      >
      </v-textarea>
      <v-btn
        class="send"
        icon
        :disabled="$v.$invalid"
        color="transparent"
        plain
      >
        <v-icon class="send_reply" @click="submit"
          >mdi-send-circle-outline</v-icon
        >
      </v-btn>
    </div>
  </v-scroll-y-transition>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import FormValidations from "@/mixins/FormValidations";

export default {
  data: () => ({ content: null, id: null }),
  mixins: [validationMixin, FormValidations],

  validations: {
    content: { required },
  },

  props: {
    username: String,
    value: Boolean,
  },

  methods: {
    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) return;
      this.$emit("click", this.content);
      this.content = "";
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/colors.scss";
.reply__expansion {
  min-height: 150px;
  width: 100%;
  border-radius: 10px !important;
  background-color: $lighter-bg !important;
  padding: 0.2rem 1rem;

  .v-input {
    &--has-state {
      border: 1px solid transparent !important;
    }
  }

  .send {
    display: flex;
    width: 100%;
  }
  .send_reply {
    margin-left: auto;
    color: $blue !important;
    cursor: pointer;
    transition: all 0.3s ease !important;
    margin-bottom: 0.5rem;

    .v-input {
      &.v-textarea {
        color: $text_primary !important;
      }
      &--has-state {
        border: 1px solid transparent !important;
      }
    }

    &:active,
    &:hover {
      transform: scale(1.1);
      color: $purple !important;
    }
  }

  .v-input--is-focused {
    border: 1px solid transparent !important;
  }
}
</style>
