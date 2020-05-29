import Vue from 'vue';
import Vuex from 'vuex';
import * as Cookies from 'js-cookie';
import * as types from './types';

// configure cookies
const COOKIE_EMAIL = 'iloilo-admin-email';
const COOKIE_AUTH_TOKEN = 'iolio-admin-auth_token';
const COOKIE_USER_ID = 'iloilo-admin-user-id';

Vue.use(Vuex);

const initialState = {
  user: {
    email: Cookies.get(COOKIE_EMAIL),
    auth_token: Cookies.get(COOKIE_AUTH_TOKEN),
    id: Cookies.get(COOKIE_USER_ID),
  },
  timeIntervalId: null,
  activeQuizzes: [],
  reports: [],
};

export default new Vuex.Store({
  state: {
    ...initialState,
  },
  mutations: {
    [types.LOGIN_USER](state, payload) {
      state.user = { ...payload.user };

      // put data to cookies
      Cookies.set(COOKIE_AUTH_TOKEN, state.user.auth_token);
      Cookies.set(COOKIE_EMAIL, state.user.email);
      Cookies.set(COOKIE_USER_ID, state.user.id);
    },
    [types.LOGOUT_USER](state) {
      state.user = {
        email: null,
        auth_token: null,
        id: null,
      };
      Cookies.remove(COOKIE_AUTH_TOKEN);
      Cookies.remove(COOKIE_EMAIL);
      Cookies.remove(COOKIE_USER_ID);
    },
    [types.SET_TIME_INTERVAL](state, payload) {
      state.timeIntervalId = payload.id;
    },
    [types.LOAD_ACTIVE_QUIZZES](state, payload) {
      state.activeQuizzes = [...payload.activeQuizzes];
    },
    [types.LOAD_REPORTS](state, payload) {
      state.reports = [...payload.reports];
    },
  },
  actions: {
    loginUser(context, user) {
      context.commit(types.LOGIN_USER, { user });
    },
    logoutUser(context) {
      context.commit(types.LOGOUT_USER);
    },
    setTimeInterval(context, id) {
      context.commit(types.SET_TIME_INTERVAL, { id });
    },
    loadActiveQuizzes(context, activeQuizzes) {
      context.commit(types.LOAD_ACTIVE_QUIZZES, { activeQuizzes });
    },
    loadReports(context, reports) {
      context.commit(types.LOAD_REPORTS, { reports });
    },
  },
  getters: {
    isLogged: (state) => state.user.email && state.user.auth_token,
    getToken: (state) => state.user.auth_token,
    getUserId: (state) => state.user.id,
    getTimeInterval: (state) => state.timeIntervalId,
  },
  modules: {
  },
});
