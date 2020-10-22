export default {
  setUser(state, payload) {
    state.token = payload.token;
    state.userId = payload.userId;
    state.didAutoLogout = false;
  },
  // don't stay on protected page when token expires
  setAutoLogout(state) {
    state.setAutoLogout = true;
  }
};
