import {fbkey as firebaseurl} from '../../../firebase.js'

export default {
  async contactCoach(context, payload) {
    const newRequest = {
      id: new Date().toISOString(),
      userEmail: payload.email,
      message: payload.message
    }

    const response = await fetch(`${firebaseurl}/requests/${payload.coachId}.json`, {
      method: 'POST',
      body: JSON.stringify(newRequest)
    })

    const resData = await response.json()

    if (!response.ok) {
      const error = new Error(resData.message || 'Failed to send coach request!')
      throw error
    }

    newRequest.id = resData.name
    newRequest.coachId = payload.coachId

    context.commit('addRequest', newRequest)
  },

  async fetchRequests(context) {
    const coachId = context.rootGetters.userId
    const response = await fetch(`${firebaseurl}/requests/${coachId}.json`)
    const resData = await response.json()

    if (!response.ok) {
      const error = new Error(resData.message || 'Failed to fetch coach requests')
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