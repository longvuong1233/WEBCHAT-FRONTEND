import vue from "vue"
import vuex from "vuex"

import AuthStore from "./modules/auth"
import socialStore from "./modules/social"
vue.use(vuex)


export default new vuex.Store({

    modules: {
        AUTH: AuthStore,
        SOCIAL: socialStore
    }
})