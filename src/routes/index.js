import startPage from "../components/NonAuth/startPage.vue"
import HelloWorld from "../components/HelloWorld.vue"
import myFriendPage from "../components/Auth/myFriendPage.vue"
import messagePage from "../components/Auth/messagePage.vue"
import store from "../store/index"
import Vue from 'vue'
const routes = [{
        path: "/start",
        component: startPage,
        name: "startPage",
        beforeEnter: (to, from, next) => {
            if (store.getters["AUTH/getAuth"] == true) {
                next({ name: "index" })
            } else {
                if (Vue.$cookies.get("idtoken") != "") {
                    store.dispatch("AUTH/checkAuth", Vue.$cookies.get("idtoken"))

                }
                next()
            }
        }
    },
    {
        path: "/",
        component: HelloWorld,
        beforeEnter: async(to, from, next) => {
            if (Vue.$cookies.get("idtoken") != "") {
                await store.dispatch("AUTH/checkAuth", Vue.$cookies.get("idtoken"))

            } else {
                next({ name: "startPage" })
            }
            if (store.getters["AUTH/getAuth"] == false) {
                next({ name: "startPage" })
            } else {
                next()
            }
        },
        children: [
            { path: "", name: "index", component: messagePage },

            { path: "myfriend", name: "listfriendPage", component: myFriendPage }
        ]

    },

]

export default routes