export default {
  userId(state) {
    return state.userId
  },
  // used when we send requests to protected URLs
  token(state) {
    return state.token
  },
  isAuthenticated(state) {
    return !!state.token
  }
}