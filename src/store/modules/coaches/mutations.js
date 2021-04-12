export default {
    registerCoach(state, payload) {
        state.coaches.push(payload)
    },
    setCoaches(state, payload) {
        state.coaches = payload;
    },
    setFetchTimeStamp(state){
        state.lastFetchTime =  new Date().getTime();
    }
}