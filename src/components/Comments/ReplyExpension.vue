<template>
  <v-scroll-y-transition>
    <div class="reply__expansion" v-if="value">
      <v-textarea
        height="150px"
        required
        no-resize
        :label="`Replying to @${username}`"
        v-model="content"
      >
      </v-textarea>
      <div class="send">
        <v-icon class="send_reply" @click="submit"
          >mdi-send-circle-outline</v-icon
        >
      </div>
    </div>
  </v-scroll-y-transition>
</template>

<script>
export default {
  data: () => ({ content: null, id: null }),

  props: {
    username: String,
    value: Boolean,
  },

  methods: {
    submit() {
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
  border-radius: 1rem !important;
  background-color: $lighter-bg !important;
  padding: 0.2rem 1rem;

  .v-text-field__slot {
    label {
      font-size: 13px;
      color: $text_primary !important ;
      opacity: 0.5;
      margin: 0 !important;
    }

    textarea {
      margin-top: 0.5rem;
      min-height: 100px !important;
      color: $text_primary !important;
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

    .v-input.v-textarea {
      color: $text_primary !important;
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
