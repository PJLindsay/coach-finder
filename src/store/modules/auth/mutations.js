export default {
  setUser(state, payload) {
    state.token = payload.token
    state.userId = payload.userId
    state.didAutoLogout = false
  },
  // use this to make sure we don't stay on protected page when token expires
  setAutoLogout(state) {
    state.setAutoLogout = true
  }
}