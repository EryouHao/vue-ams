import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import { state, mutations } from './mutations'
import * as getters from './getters'
import login from './modules/login'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  modules: {
    login: login
  },
  strict: debug
})
