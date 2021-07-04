import sortBy from "lodash/sortBy";

const state = {
  feedbacks: [],
  currentUser: {},
  filter: "all",
  sortBy: "most_upvotes",
};

const mutations = {
  setFeedbacks(state, payload) {
    // Setting by default missing data arrays such as comments and replies for efficiency.
    const getComments = payload
      .map((fb) => {
        if (!fb.comments) fb.comments = [];
        return fb.comments;
      })
      .map((comment) => {
        comment.forEach((comm) => {
          if (!comm.replies) comm.replies = [];
        });
        return getComments;
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

  deleteFeedback(state, id) {
    state.feedbacks = state.feedbacks.filter((fb) => fb.id !== Number(id));
  },

  saveFeedbackById(state, { id, data }) {
    const identifier = state.feedbacks.findIndex((i) => i.id === Number(id));
    state.feedbacks[identifier] = data;
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

    const setDefaultRepliesArray = state.feedbacks[identifier].comments.forEach(
      (comm) => {
        if (!comm.replies) comm.replies = [];
      }
    );
    return setDefaultRepliesArray;
  },

  addReply(state, { id, reply }) {
    const identifier = state.feedbacks.findIndex((i) => i.id === Number(id));

    console.log(identifier);

    let comments = state.feedbacks[identifier]?.comments.map((comment) => {
      if (comment) return comment;
    });

    let allReplies = comments.map((fb) => {
      if (fb?.replies) return fb?.replies;
    });

    let allUsernames = comments.map((fb) => {
      return fb.user.username;
    });

    const replyItself = allReplies.filter((r, i) => {
      if (r)
        return r.push({
          content: reply,
          replyingTo: allUsernames[i],
          user: state.currentUser,
        });
    });

    console.log(replyItself);
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
  deleteFeedback({ commit }, id) {
    commit("deleteFeedback", id);
    saveFeedbackToLocalStorage();
  },
  saveFeedbackById({ commit }, { data, id }) {
    commit("saveFeedbackById", { data, id });
    saveFeedbackToLocalStorage();
  },
  addComment({ commit }, { id, comment }) {
    commit("addComment", { id, comment });
    saveFeedbackToLocalStorage();
  },
  addReply({ commit }, { id, reply }) {
    commit("addReply", { id, reply });
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
  getFeedbacksByStatus(state, getters) {
    return (status) => {
      return getters.feedbacks.filter((feedback) => feedback.status === status);
    };
  },
  getFeedbackCommentsById(state, getters) {
    return (id) => {
      const identifier = getters.feedbacks.findIndex((i) => i.id === id);
      const comments = getters.feedbacks[identifier].comments;
      if (comments) return comments.map((comment) => comment);
    };
  },
  getStatus(state, getters) {
    return (roadmap) => {
      return getters.feedbacks
        .map((fb) => fb.status)
        .filter((status) => {
          if (status === "suggestion") return;
          return status === roadmap;
        });
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
