import axios from 'axios';
import { SessionStorage } from 'quasar';

const state = {
  genres: [],
};

const mutations = {

};

const actions = {
  async getchGenres(){
    const request = await axios.get("/genres");
    return request.data
  },
  async createGenre(context, { genre }){
    const user = SessionStorage.getItem('user');
    const request = await axios.post(`/genres/${user._id}/genre`, {
      name: genre,
    });
    return request.data;
  },
}

const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
