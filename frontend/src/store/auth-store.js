import axios from 'axios';

const state = {
  user: null,
  register: null,
};

const mutations = {
  login(state, user) {
    state.user = user;
  },
};

const actions = {
  async login({ commit }, { usernameOrMail, password }) {
    const request = await axios.post('/users/login', {
      usernameOrMail,
      password,
    });
    commit('login', request.data);
    return request.data;
  },
  async register({ commit }, {
    name, username, email, password,
  }) {
    const request = await axios.post('/users/', {
      name,
      userName: username,
      email,
      password,
    });
    commit('login', request.data);
    return request.data;
  },
};

const getters = {

};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
