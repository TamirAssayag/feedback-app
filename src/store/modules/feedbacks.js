import sortBy from "lodash/sortBy";

const state = {
  feedbacks: [],
  currentUser: {},
  filter: "all",
  sortBy: "most_upvotes",
};

const mutations = {
  setFeedbacks(state, payload) {
    payload.map((fb) => {
      if (!fb.comments) fb.comments = [];
    });
    state.feedbacks = payload;
  },
  setCurrentUser(state, payload) {
    state.currentUser = payload;
  },
  updateFilter(state, payload) {
    state.filter = payload;
  },
  updateSort(state, payload) {
    state.sortBy = payload;
  },
  upVoteFeedbackById(state, id) {
    const identifier = state.feedbacks.findIndex((i) => i.id === id);
    const hasUserUpVoted = state.feedbacks[identifier].hasUserUpVoted;

    if (!hasUserUpVoted) state.feedbacks[identifier].upvotes++;
    else state.feedbacks[identifier].upvotes--;

    state.feedbacks[identifier].hasUserUpVoted = !hasUserUpVoted ? true : false;
  },
  addFeedback(state, data) {
    const lastItemInArray = state.feedbacks[state.feedbacks.length - 1];
    const id = lastItemInArray?.id ? lastItemInArray.id + 1 : 1;
    data = { ...data, id: id };
    state.feedbacks.push(data);
  },
  addComment(state, { id, comment }) {
    const identifier = state.feedbacks.findIndex((i) => i.id === Number(id));
    if (state.feedbacks[identifier]?.comments) {
      const lastItemInArray =
        state.feedbacks[identifier]?.comments[
          state.feedbacks[identifier]?.comments.length - 1
        ];
      const generateId = lastItemInArray?.id ? lastItemInArray.id + 1 : 1;
      state.feedbacks[identifier].comments.push({
        id: generateId,
        content: comment,
        user: state.currentUser,
      });
    }
  },
  deleteComment(state, { feedbackId, id }) {
    const identifier = state.feedbacks.findIndex(
      (i) => i.id === Number(feedbackId)
    );

    state.feedbacks[identifier].comments = state.feedbacks[
      identifier
    ].comments.filter((fb) => fb.id !== id);
  },
};

const saveFeedbackToLocalStorage = () =>
  localStorage.setItem("feedbacks", JSON.stringify(state.feedbacks));

const saveCurrentUserToLocalStorage = () =>
  localStorage.setItem("currentUser", JSON.stringify(state.currentUser));

const actions = {
  setFeedbacks({ commit }, payload) {
    commit("setFeedbacks", payload);
    saveFeedbackToLocalStorage();
  },
  setCurrentUser({ commit }, payload) {
    commit("setCurrentUser", payload);
    saveCurrentUserToLocalStorage();
  },
  updateFilter({ commit }, filter) {
    commit("updateFilter", filter);
  },
  updateSort({ commit }, sort) {
    commit("updateSort", sort);
  },
  upVoteFeedbackById({ commit }, id) {
    commit("upVoteFeedbackById", id);
    saveFeedbackToLocalStorage();
  },
  addFeedback({ commit }, data) {
    commit("addFeedback", data);
    saveFeedbackToLocalStorage();
  },
  addComment({ commit }, { id, comment }) {
    commit("addComment", { id, comment });
    saveFeedbackToLocalStorage();
  },
  deleteComment({ commit }, { feedbackId, id }) {
    commit("deleteComment", { feedbackId, id });
    saveFeedbackToLocalStorage();
  },
};

const getters = {
  user: (state) => state.currentUser,
  feedbacks: (state) => {
    return state.feedbacks.map((fb) => {
      let totalComments = 0;

      if (fb.comments?.length) {
        for (const comm of fb.comments) {
          if (comm.replies) totalComments += comm.replies.length;
        }

        totalComments += fb.comments.length;
      }

      return { ...fb, totalComments };
    });
  },
  getFilter: (state) => state.filter,
  getSortBy: (state) => state.sortBy,

  feedbackByCategory: (state, getters) => {
    let filterByCategory = getters.feedbacks.filter((feedback) => {
      if (state.filter === "all") return feedback;
      return feedback.category.toLowerCase() === state.filter.toLowerCase();
    });

    switch (state.sortBy) {
      case "most_upvotes":
        return sortBy(filterByCategory, ["upvotes"]).reverse();

      case "least_upvotes":
        return sortBy(filterByCategory, ["upvotes"]);

      case "most_comments":
        return sortBy(filterByCategory, ["totalComments"]).reverse();

      case "least_comments":
        return sortBy(filterByCategory, ["totalComments"]);

      default:
        return filterByCategory;
    }
  },

  getFeedbackById(state, getters) {
    return (id) => {
      return getters.feedbacks.find((feedback) => feedback.id === id);
    };
  },
  getFeedbackCommentsById(state, getters) {
    return (id) => {
      const identifier = getters.feedbacks.findIndex((i) => i.id === id);
      const comments = getters.feedbacks[identifier].comments;
      if (comments) return comments.map((comment) => comment);
    };
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
