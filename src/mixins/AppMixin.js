import { mapActions, mapGetters } from "vuex";

export default {
  methods: {
    ...mapActions({
      upVoteFeedbackById: "feedbacks/upVoteFeedbackById",
    }),
    consoleLog(param) {
      return console.log(param);
    },
    directToFeedback(id) {
      this.$router.push({ name: "id", params: { id } });
    },
    goBack() {
      return this.$router.go(-1);
    },
  },

  computed: {
    ...mapGetters({
      feedbacks: "feedbacks/feedbackByCategory",
      getFeedbackById: "feedbacks/getFeedbackById",
      getFeedbackCommentsById: "feedbacks/getFeedbackCommentsById",
      user: "feedbacks/user",
    }),
    feedback() {
      return this.getFeedbackById(Number(this.$route.params.id));
    },
    comments() {
      return this.getFeedbackCommentsById(Number(this.$route.params.id));
    },
  },

  filters: {
    capitalize(value) {
      if (typeof value !== "string") return "";
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
};
