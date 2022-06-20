import Vue from 'vue'
import Vuex from 'vuex'

import songs from './songs-store';
import artists from './artists-store';
import genres from './genres-store';
import auth from './auth-store';

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */


export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      songs,
      artists,
      genres,
      auth,
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })

  return Store
}
