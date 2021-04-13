export default {
    async registerCoach(context, data) {
        const userId = context.rootGetters.userId
        const coachData = {
            firstName: data.first,
            lastName: data.last,
            hourlyRate: data.rate,
            description: data.desc,
            areas: data.areas

        }
        const token = context.rootGetters.token;

        const response = await fetch(`https://vue-http-demo-1a915-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=${token}`, {
            method: 'PUT',
            body: JSON.stringify(coachData)
        });

        const responseData = await response.json();
        console.log(responseData);
        if (!response.ok) {
            // error
        }

        context.commit('registerCoach', {
            ...coachData,
            id: userId
        });
    },
    async loadCoaches(context, payload) {
        if (!payload.forceRefresh && !context.getters.shouldUpdate) {
            return;
        }
        let response = await fetch(`https://vue-http-demo-1a915-default-rtdb.firebaseio.com/coaches.json`);

        const responseData = await response.json();

        if (!response.ok) {
            // error

            const error = new Error(responseData.message || 'Failed to Fetch')
            throw error;
        }

        const coaches = [];

        for (const key in responseData) {
            const coach = {
                id: key,
                firstName: responseData[key].firstName,
                lastName: responseData[key].lastName,
                hourlyRate: responseData[key].hourlyRate,
                description: responseData[key].description,
                areas: responseData[key].areas
            }
            coaches.push(coach);
        }

        context.commit('setCoaches', coaches);
        context.commit('setFetchTimeStamp');

    }
}