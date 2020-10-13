import firebaseurl from '../../../firebase.js'

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

    const response = await fetch(`${firebaseurl}/${userId}.json`, {
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
  }
}