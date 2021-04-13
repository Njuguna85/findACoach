export default {
    setUser(state, payload) {
        state.token = payload.toke;
        state.userId = payload.userId;
        state.tokenExpiration = payload.tokenExpiration;
    }
};