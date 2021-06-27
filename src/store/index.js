import Vue from "vue";
import Vuex from "vuex";
import feedbacks from "./modules/feedbacks";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    feedbacks,
  },
});
