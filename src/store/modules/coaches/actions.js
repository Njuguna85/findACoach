export default {
    registerCoach(context, data) {
        const coachData = {
            id: 'c3',
            firstName: data.first,
            lastname: data.last,
            hourlyRate: data.rate,
            description: data.desc,
            areas: data.areas

        }
        context.commit('registerCoach', coachData);
    }
}