import { mapGetters } from "vuex";

export default {
  methods: {
    consoleLog(param) {
      return console.log(param);
    },
    goBack() {
      return this.$router.go(-1);
    },
  },

  computed: {
    ...mapGetters({
      feedbacks: "feedbacks/feedbackByCategory",
    }),
  },

  filters: {
    capitalize(value) {
      if (typeof value !== "string") return "";
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
};
