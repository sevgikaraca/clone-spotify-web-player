import axios from 'axios';
import { SessionStorage } from 'quasar';

const state = {
  nowPlaying: '',
  queue: [],
};

const mutations = {
  addToQueue(state, song) {
    state.queue.push(song);
  },
  // playFromQueue(state, index) {
  //   state.queue.splice(0, index);
  // },
  playSong(state, song) {
    state.queue = [song];
  },
  playNext(state) {
    state.queue.shift();
  },
  removeFromQueue(state, index) {
    state.queue.splice(index, 1);
  },
};

const actions = {
  addToQueue({ commit }, songs) {
    if (Array.isArray(songs)) {
      songs.forEach((song) => commit('addToQueue', song));
    } else {
      commit('addToQueue', songs);
    }
  },
  // playFromQueue({ commit }, songIndex) {
  //   commit('playFromQueue', songIndex);
  // },
  playSong({ commit }, song) {
    commit('playSong', song);
  },
  playNext({ commit }) {
    commit('playNext');
  },
  removeFromQueue({ commit }, index) {
    commit('removeFromQueue', index);
  },
  async addSong(context, data) {
    const user = SessionStorage.getItem('user');
    const request = await axios.post(`songs/${user._id}/song`, data);
    return request;
  },
  async addSongToLibrary(context, song) {
    const user = SessionStorage.getItem('user');
    const request = await axios.post(`users/${user._id}/saveSong/${song._id}`);
    try {
      SessionStorage.set('user', {});
    } catch (error) {
      console.log(error);
    }
    console.log(SessionStorage.set('user', user));
    console.log(SessionStorage.getItem('user'));
    return request;
  },
  async fetchSongs() {
    const request = await axios.get('/songs');
    return request.data;
  },
  async findSong(context, { _id }) {
    const request = await axios.get(`/songs/${_id}`);
    const songsRequest = await axios.get(`/songs/song/${_id}`);
    const data = { song: request.data, songs: songsRequest.data };
    return data;
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
