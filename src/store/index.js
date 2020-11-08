import vue from "vue"
import vuex from "vuex"

import AuthStore from "./modules/auth"
vue.use(vuex)


export default new vuex.Store({

    modules: {
        AUTH: AuthStore
    }
})