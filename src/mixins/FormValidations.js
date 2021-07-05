export default {
  computed: {
    titleErrors() {
      const errors = [];
      const $v = this.$v.newFeedback.title;
      if (!$v.$dirty) {
        return errors;
      } else {
        !$v.required && errors.push("Can't be empty");
      }
      return errors;
    },
    categoryErrors() {
      const errors = [];
      const $v = this.$v.newFeedback.category;
      if (!$v.$dirty) {
        return errors;
      } else {
        !$v.required && errors.push("Can't be empty");
      }
      return errors;
    },
    statusErrors() {
      const errors = [];
      const $v = this.$v.newFeedback.status;
      if (!$v.$dirty) {
        return errors;
      } else {
        !$v.required && errors.push("Can't be empty");
      }
      return errors;
    },
    descriptionErrors() {
      const errors = [];
      const $v = this.$v.newFeedback.description;
      if (!$v.$dirty) {
        return errors;
      } else {
        !$v.required && errors.push("Can't be empty");
      }
      return errors;
    },
    replyErrors() {
      const errors = [];
      const $v = this.$v.content;
      if (!$v.$dirty) {
        return errors;
      } else {
        !$v.required && errors.push("");
      }
      return errors;
    },
    commentErrors() {
      const errors = [];
      const $v = this.$v.content;
      if (!$v.$dirty) {
        return errors;
      } else {
        !$v.required && errors.push("");
      }
      return errors;
    },
  },
};
