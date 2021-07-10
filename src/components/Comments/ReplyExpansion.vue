<template>
  <v-expand-transition appear>
    <div class="reply__expansion" v-if="value">
      <v-form class="reply__expansion__form" @submit.prevent="submit">
        <v-textarea
          v-if="value"
          required
          color="input"
          no-resize
          v-model="content"
          :error-messages="replyErrors"
          :placeholder="`Replying to @${user.username}`"
          @focus="$v.content.$reset()"
          @blur="$v.content.$touch()"
        ></v-textarea>

        <v-btn
          class="send"
          icon
          :disabled="$v.$invalid"
          color="transparent"
          plain
          type="submit"
        >
          <v-icon class="send_reply">mdi-send-circle-outline</v-icon>
        </v-btn>
      </v-form>
    </div>
  </v-expand-transition>
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
@import "@/styles/import.scss";

.reply__expansion {
  background-color: $lighter-bg !important;
  border-radius: 10px !important;

  &__form {
    padding: 0 0.5rem 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;

    input {
      min-height: 50px;
      color: $text_primary !important;
    }
  }

  .v-input {
    &--has-state {
      border: 1px solid transparent !important;
    }
  }

  .send {
    cursor: pointer;
    align-self: flex-end;
  }
  .send_reply {
    color: $blue !important;
    transition: all 0.3s ease !important;

    &:active,
    &:hover {
      transform: scale(1.05);
      color: $purple !important;
    }
  }

  .v-input--is-focused {
    border: 1px solid transparent !important;
  }

  @include media(">=md") {
    margin-left: 4.5rem;
  }
}
</style>
