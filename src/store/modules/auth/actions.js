// import firebaseurl from '../../../firebase.js' // e.g. https://someprojectkey.firebaseio.com
import {API_KEY} from '../../../firebase.js'

export default {
  async login(context, payload) {
    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      })
    })

    const resData = await response.json()

    if (!response.ok) {
      console.error('ERROR Login: ', resData)
      const error = new Error(resData.message || 'Failed to login. Check your email/password.')
      throw error
    }

    console.log('SUCCESS Login: ', resData)
    context.commit('setUser', {
      token: resData.idToken,
      userId: resData.localId,
      tokenExpiration: resData.expiresIn
    })

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

    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      })
    })

    const resData = await response.json()

    if (!response.ok) {
      console.error('ERROR: ', resData)
      const error = new Error(resData.message || 'Failed to signup. Check your email/password.')
      throw error
    }

    console.log('SUCCESS: ', resData)
    context.commit('setUser', {
      token: resData.idToken,
      userId: resData.localId,
      tokenExpiration: resData.expiresIn
    })

  }
}