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
    goHome() {
      if (!this.isOpen) return;
      this.isOpen = false;
      setTimeout(() => this.$router.go(-1), 160);
    },
    displayStatusAmount(roadmap) {
      return this.getStatus(roadmap.toLowerCase()).length;
    },
    statusByName(roadmap) {
      return this.getStatus(roadmap.toLowerCase());
    },
  },

  computed: {
    ...mapGetters({
      feedbacks: "feedbacks/feedbacks",
      suggestions: "feedbacks/feedbackByCategory",
      getFeedbackById: "feedbacks/getFeedbackById",
      getFeedbackCommentsById: "feedbacks/getFeedbackCommentsById",
      user: "feedbacks/user",
      getStatus: "feedbacks/getStatus",
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
