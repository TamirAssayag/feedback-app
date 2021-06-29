const state = {
  feedbacks: [],
  filter: "all",
  sortBy: "most_upvotes",
};

const mutations = {
  setFeedbacks(state, payload) {
    state.feedbacks = payload;
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
};

const saveToLs = () =>
  localStorage.setItem("feedbacks", JSON.stringify(state.feedbacks));

const sortByUpvotes = (array) =>
  array.sort((a, b) => (a.upvotes > b.upvotes ? -1 : 1));

const sortByComments = (array) =>
  array.sort((a, b) => {
    const aLength = a.comments?.length || 0;
    const bLength = b.comments?.length || 0;
    return aLength > bLength ? -1 : 1;
  });

const actions = {
  setFeedbacks({ commit }, payload) {
    commit("setFeedbacks", payload);
    saveToLs();
  },
  updateFilter({ commit }, filter) {
    commit("updateFilter", filter);
  },
  updateSort({ commit }, sort) {
    commit("updateSort", sort);
  },
  upVoteFeedbackById({ commit }, id) {
    commit("upVoteFeedbackById", id);
    saveToLs();
  },
  addFeedback({ commit }, data) {
    commit("addFeedback", data);
    saveToLs();
  },
};

const getters = {
  getFeedbacks: (state) => state.feedbacks,
  getFilter: (state) => state.filter,
  getSortBy: (state) => state.sortBy,
  feedbackByCategory: (state) => {
    const filterByCategory = state.feedbacks.filter((feedback) => {
      if (state.filter === "all") return feedback;
      return feedback.category === state.filter;
    });

    if (state.sortBy === "most_upvotes") {
      sortByUpvotes(filterByCategory);
    } else if (state.sortBy === "least_upvotes") {
      sortByUpvotes(filterByCategory).reverse();
    } else if (state.sortBy === "most_comments") {
      filterByCategory.map((f) => f.comments?.length || 0);
      sortByComments(filterByCategory);
    } else if (state.sortBy === "least_comments") {
      sortByComments(filterByCategory).reverse();
    }

    return filterByCategory;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
