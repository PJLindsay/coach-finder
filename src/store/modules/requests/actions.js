// import firebaseurl from '../../../firebase.js' // e.g. https://someprojectkey.firebaseio.com
import {fbkey as firebaseurl} from '../../../firebase.js'

export default {
  async contactCoach(context, payload) {
    const newRequest = {
      id: new Date().toISOString(),
      userEmail: payload.email,
      message: payload.message
    }

    // storing request 'tagged' for a coach
    const response = await fetch(`${firebaseurl}/requests/${payload.coachId}.json`, {
      method: 'POST',
      body: JSON.stringify(newRequest)
    })

    const resData = await response.json()

    if (!response.ok) {
      const error = new Error(resData.message || 'Failed to send request!')
      throw error
    }

    newRequest.id = resData.name
    newRequest.coachId = payload.coachId

    context.commit('addRequest', newRequest)
  },

  async fetchRequests(context) {
    const coachId = context.rootGetters.userId
    // const token = context.rootGetters.token
    // attach token to access a protected resource
    // console.log('my token is: ', token)
    // const response = await fetch(`${firebaseurl}/requests/${coachId}.json?auth=${token}`)
    const response = await fetch(`${firebaseurl}/requests/${coachId}.json`)
    const resData = response.json()

    if (!response.ok) {
      const error = new Error(resData.message || 'Failed to fetch requests')
      throw error
    }

    const requests = []
    for(const key in resData) {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: resData[key].userEmail,
        message: resData[key].message
      }
      requests.push(request)
    }

    context.commit('setRequests', requests)
  }
}