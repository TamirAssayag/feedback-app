const state = {
  feedbacks: [],
};

const mutations = {
  setFeedbacks(state, payload) {
    state.feedbacks = payload;
  },
  upVoteFeedbackById(state, id) {
    const identifier = state.feedbacks.findIndex((i) => i.id === id);
    const hasUserUpVoted = state.feedbacks[identifier].hasUserUpVoted;

    if (!hasUserUpVoted) {
      state.feedbacks[identifier].upvotes++;
      state.feedbacks[identifier].hasUserUpVoted = true;
    } else {
      state.feedbacks[identifier].upvotes--;
      state.feedbacks[identifier].hasUserUpVoted = false;
    }
  },
};

const saveToLs = () =>
  localStorage.setItem("feedbacks", JSON.stringify(state.feedbacks));

const actions = {
  setFeedbacks({ commit }, payload) {
    commit("setFeedbacks", payload);
    saveToLs();
  },
  upVoteFeedbackById({ commit }, id) {
    commit("upVoteFeedbackById", id);
    saveToLs();
  },
};

const getters = {
  getFeedbacks: (state) => state.feedbacks,
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
