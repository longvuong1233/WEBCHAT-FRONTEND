import authApi from "../../apis/auth/index"


const state = {
    loading: false,
    email: "",
    idToken: "",
    displayName: "",
    auth: false,
    mesError: "",

}
const getters = {
    getAuth: (state) => {
        return state.auth
    },
    getLoading(state) {
        return state.loading
    },
    getEmail(state) {
        return state.email
    },
    getIdToken(state) {
        return state.idToken
    },
    getDisplayName(state) {
        return state.displayName
    },
    getMesError(state) {
        return state.mesError
    },

}
const mutations = {
    reInitialState(state) {
        state.loading = false;
        state.email = "";
        state.displayName = "";
        state.idToken = "";
        state.auth = false;
        state.mesError = "";

    },
    signin(state, payload) {
        console.log(payload)
        if (payload.result == false) {
            state.mesError = payload.data.message
        } else {

            const { email, displayName } = payload.user
            const idToken = payload.user.stsTokenManager.accessToken
            state.email = email
            state.displayName = displayName
            state.idToken = idToken
            state.auth = true
        }



    },
    signup(state, payload) {
        if (payload.result == false) {
            state.mesError = payload.data.message
        } else {

            const { email, displayName } = payload.user
            const idToken = payload.user.stsTokenManager.accessToken
            state.email = email
            state.displayName = displayName
            state.idToken = idToken
            state.auth = true
        }

    },

    loading(state, payload) {
        state.mesError = ""
        state.loading = payload
    },
    removeMesError(state) {
        state.mesError = ""
    },
    verifyEmail(state) {
        console.log(state, "commit r")
    }

}
const actions = {
    async signin({ commit }, user) {
        commit("loading", true)
        const result = await authApi.signin(user)
        commit("loading", false)
        commit("signin", result)

    },
    async signup({ commit }, credential) {
        commit("loading", true)
        const result = await authApi.signup(credential)

        commit("loading", false)
        commit("signup", result)
    },
    async logout({ commit }) {
        const result = await authApi.logout()

        if (result.data.result == true) {

            commit("reInitialState")
        }

    },
    removeMesError({ commit }) {
        commit("removeMesError")
    },
    async verifyEmail({ commit }) {

        const result = await authApi.verifyEmail()
        console.log(result, "Action")
        commit("verifyEmail")

    }

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}