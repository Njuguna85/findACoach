export default {
    registerCoach(context, data) {
        const coachData = {
            id: context.rootGetters.userId,
            firstName: data.first,
            lastname: data.last,
            hourlyRate: data.rate,
            description: data.desc,
            areas: data.areas

        }
        context.commit('registerCoach', coachData);
    }
}