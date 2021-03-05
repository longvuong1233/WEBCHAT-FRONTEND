import api from "../../apis/auth/index";
import { fb, firebase } from "../../apis/firebase/config";
import socialAPI from "../../apis/social/index";

const state = {
  myFriend: [],
  allUsers: [],
  myChat: [],
  loading: false,
  callRoom: "",
  tokenCall: "",
  callTarget: "",
  emailTarget: "",
};

const getters = {
  getEmailTarget(state) {
    return state.emailTarget;
  },
  getCallTarget(state) {
    return state.callTarget;
  },
  getCallRoom(state) {
    return state.callRoom;
  },
  getTokenCall(state) {
    return state.tokenCall;
  },
  getLoading(state) {
    return state.loading;
  },
  getMyFriend(state) {
    return state.myFriend;
  },
  getAllUsers(state) {
    return state.allUsers;
  },
  getMyChat(state) {
    return state.myChat;
  },
};

const mutations = {
  reInitialState(state) {
    (state.myFriend = []),
      (state.allUsers = []),
      (state.myChat = []),
      (state.loading = false),
      (state.callRoom = ""),
      (state.tokenCall = ""),
      (state.callTarget = ""),
      (state.emailTarget = "");
  },
  setEmailTarget(state, email) {
    state.emailTarget = email;
  },
  loading(state, payload) {
    state.loading = payload;
  },
  setAllUsers(state, payload) {
    state.allUsers = payload;
  },
  setAllFriend(state, payload) {
    state.myFriend = payload;
  },

  makeFriend() {},
  setCallTarget(state, email) {
    state.callTarget = email;
  },
  createCallRoom(state, payload) {
    state.callRoom = payload.identity;
    state.tokenCall = payload.token;
  },
};

const actions = {
  async getTokenRoomCall({ commit }, nameRoom) {
    commit("loading", true);
    const result = await socialAPI.getTokenRoomChat(nameRoom);

    commit("createCallRoom", result);
    commit("loading", false);
  },
  async fetchAllUser({ commit }, token) {
    commit("loading", true);
    const result = await api.getAllUsers(token);

    commit("setAllUsers", result.data);
    commit("loading", false);
  },
  fetchAllFriend({ commit }, email) {
    commit("loading", true);
    fb.collection("user")
      .doc(email)
      .get()
      .then(function(doc) {
        if (doc.exists) {
          commit("setAllFriend", doc.data().friends);
        } else {
          commit("setAllFriend", []);
        }
      })
      .catch(() => {
        commit("setAllFriend", []);
      });
    commit("loading", false);
  },
  async makeFriend({ commit }, email) {
    commit("loading", true);
    const doc = await fb
      .collection("user")
      .doc(email.friend)
      .get();
    if (doc.exists) {
      if (doc.data().friends.indexOf("email.sender") == -1) {
        fb.collection("user")
          .doc(email.friend)
          .update({
            queueFriend: firebase.firestore.FieldValue.arrayUnion({
              email: email.sender,
              state: 0,
            }),
          });
      }
    }
    commit("makeFriend");
    commit("loading", false);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
