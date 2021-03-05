import authApi from "../../apis/auth/index"

import vue from "vue"
const state = {
    loading: false,
    email: "",
    idToken: "",
    displayName: "",
    auth: false,
    mesError: "",
    photoURL: "",
    emailVerified: 0,
    forgotPW: 0,
    defaultPhotoURL: "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"

}
const getters = {
    getDefaultPhotoURL(state) {
        return state.defaultPhotoURL
    },
    getStatusForgotPW(state) {
        return state.forgotPW
    },
    getAuth: (state) => {
        return state.auth
    },
    getLoading(state) {
        return state.loading
    },
    getEmail(state) {
        return state.email
    },
    getPhotoURL(state) {
        return state.photoURL
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
    isEmailVerified(state) {
        return state.emailVerified
    }

}
const mutations = {
    changePhotoURL(state, payload) {
        state.photoURL = payload
    },
    reInitialState(state) {
        state.loading = false;
        state.email = "";
        state.displayName = "";
        state.idToken = "";
        state.auth = false;
        state.mesError = "";
        state.photoURL = ""

    },
    signin(state, payload) {

        if (payload.result == false) {
            state.mesError = payload.data.message
        } else {

            const { email, displayName, emailVerified, photoURL } = payload.user
            const idToken = payload.user.stsTokenManager.accessToken
            if (emailVerified == false) {
                state.idToken = idToken
                state.mesError = "Your account need veify email"
                state.emailVerified = -1
            } else {
                state.emailVerified = 1
                state.email = email
                state.displayName = displayName
                state.photoURL = photoURL != null ? photoURL : state.defaultPhotoURL
                state.idToken = idToken
                state.auth = true

            }

        }



    },
    checkAuth(state, payload) {
        const { result, token } = payload

        if (result.result == true && result.emailVerified == true) {
            const { email, displayName, photoURL } = result

            state.email = email
            state.auth = true
            state.photoURL = photoURL != null ? photoURL : state.defaultPhotoURL
            state.displayName = displayName
            state.idToken = token


        } else {
            vue.$cookies.remove("idtoken")
        }


    },


    signup(state, payload) {

        if (payload.result == false) {
            state.mesError = payload.data.message
        } else {
            state.idToken = payload.user.stsTokenManager.accessToken

            state.emailVerified = -1
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
        state.mesError = "Email verification was sent your email"
    },
    forgotpassword(state, payload) {

        if (payload.result == false) {

            state.mesError = payload.data.message

        } else {
            state.forgotPW = 1
        }


    },
    resetpassword(state, payload) {

        if (payload.result == false) {

            state.mesError = payload.data.message
        } else {
            state.forgotPW = 2
        }
    },
    changePassword(state, payload) {

        if (payload.result == false) {

            state.mesError = payload.data.message
        } else {
            state.forgotPW = 0
        }
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

    async checkAuth({ commit }, token) {
        commit("loading", true)
        const result = await authApi.checkAuth(token)


        commit("loading", false)
        commit("checkAuth", { result, token })
    },
    async logout({ commit }) {
        const result = await authApi.logout()

        if (result.data.result == true) {
            commit('SOCIAL/reInitialState', null, { root: true })
            commit("reInitialState")

        }

    },
    removeMesError({ commit }) {
        commit("removeMesError")
    },
    async verifyEmail({ commit }, token) {
        commit("loading", true)
        await authApi.verifyEmail(token)

        commit("loading", false)
        commit("verifyEmail")


    },
    async forgotpassword({ commit }, email) {
        commit("loading", true)
        const result = await authApi.forgotpassword(email)
        commit("loading", false)
        commit("forgotpassword", result)


    },
    async resetpassword({ commit }, token) {
        commit("loading", true)
        const result = await authApi.resetpassword(token)
        commit("loading", false)
        commit("resetpassword", result)

    },
    async changePassword({ commit }, email, newPW) {
        commit("loading", true)
        const result = await authApi.changePassword(email, newPW)
        commit("loading", false)
        commit("changePassword", result)

    },

    async setAvatar({ commit }, payload) {
        commit("loading", true)

        await authApi.setAvatar(payload.token, payload.url)
        commit("loading", false)

    }

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}