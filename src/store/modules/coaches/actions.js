import { fbkey as firebaseurl } from '../../../firebase.js';

export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;

    const coachData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas
    };

    // access a protected resource by getting our token
    // const token = context.rootGetters.token

    // const response = await fetch(`${firebaseurl}/coaches/${userId}.json?auth=${token}`, {
    const response = await fetch(`${firebaseurl}/coaches/${userId}.json`, {
      method: 'PUT',
      body: JSON.stringify(coachData)
    });

    const resData = await response.json();

    if (!response.ok) {
      const error = new Error(resData.message || 'Failed to fetch');
      throw error;
    }

    // copy coachData and merge with userId for local mutation
    context.commit('registerCoach', {
      ...coachData,
      id: userId
    });
  },

  async loadCoaches(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return; // wait until coach list is >1 minute old *or* user clicks 'refresh' button
    }

    const response = await fetch(`${firebaseurl}/coaches.json`);
    const resData = await response.json();

    if (!response.ok) {
      const error = new Error(resData.message || 'Failed to fetch');
      throw error;
    }

    const coaches = [];

    for (const key in resData) {
      const coach = {
        id: key,
        firstName: resData[key].firstName,
        lastName: resData[key].lastName,
        description: resData[key].description,
        hourlyRate: resData[key].hourlyRate,
        areas: resData[key].areas
      };
      coaches.push(coach);
    }

    context.commit('setCoaches', coaches);
    context.commit('setFetchTimestamp'); // flag this so we know when data was last fetched
  }
};
