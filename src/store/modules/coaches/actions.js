import firebaseurl from '../../../firebase.js' // e.g. https://someprojectkey.firebaseio.com

export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId

    const coachData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas
    }

    const response = await fetch(`${firebaseurl}/coaches/${userId}.json`, {
      method: 'PUT',
      body: JSON.stringify(coachData)
    })

    // const resData = await response.json()

    if (!response.ok) {
      // error
    }

    // copy coachData and merge with userId for local mutation
    context.commit('registerCoach', {
      ...coachData,
      id: userId
    })
  },

  async loadCoaches(context, payload) {

    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return // don't get data again (wait until coach list is >1 minute old) or if user clicked 'refresh' button
    }

    const response = await fetch(`${firebaseurl}/coaches.json`)
    const resData = await response.json()

    if (!response.ok) {
      const error = new Error(resData.message || 'Failed to fetch')
      throw error
    }

    const coaches = []

    for (const key in resData) {
      const coach = {
        firstName: resData[key].firstName,
        lastName: resData[key].lastName,
        description: resData[key].description,
        hourlyRate: resData[key].hourlyRate,
        areas: resData[key].areas
      }
      coaches.push(coach)
    }

    context.commit('setCoaches', coaches)
    context.commit('setFetchTimestamp') // flag this so we know when data was last fetched
  }

}