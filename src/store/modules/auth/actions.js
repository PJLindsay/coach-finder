// import firebaseurl from '../../../firebase.js' // e.g. https://someprojectkey.firebaseio.com
import {API_KEY} from '../../../firebase.js'

export default {
  async login(context, payload) {
    context.dispatch('auth', {
      ...payload,
      mode: 'login'
    })
  },

  /**
   * Refactored to "auto-login" - if user manually enters URL into browser we won't lose all data stored in store
   *
   * @param {Object} context
   * @param {Object} payload
   */
  async auth(context, payload) {
    const mode = payload.mode

    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
    if (mode === 'signup') {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`
    }

    const response = await fetch(
      url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      })
    })

    const resData = await response.json()

    if (!response.ok) {
      const error = new Error(resData.message || 'Failed to login. Check your email/password.')
      throw error
    }

    // put data in browser storage
    localStorage.setItem('token', resData.idToken)
    localStorage.setItem('userId', resData.localId)

    context.commit('setUser', {
      token: resData.idToken,
      userId: resData.localId,
      tokenExpiration: resData.expiresIn
    })
  },

  /**
   * Try login - check to see if data is stored in browser local Storage
   * used in cases where user manually enters a URL and we lose store data
   * we will pull token out of local storage, then save it back to auth store
   *
   * called by App.vue created() hook
   */
  tryLogin(context) {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')

    if (token && userId) {
      context.commit('setUser', {
        token: token,
        userId: userId,
        tokenExpiration: null
      })
    }
  },

  logout(context) {
    context.commit('setUser', {
      token: null,
      userId: null,
      tokenExpiration: null
    })
  },

  /**
   * Google Firebase documentation here:
   * https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
   *
   * @param {Object} context
   * @param {Object} payload
   */
  async signup(context, payload) {

    context.dispatch('auth', {
      ...payload,
      mode: 'signup'
    })

  }
}