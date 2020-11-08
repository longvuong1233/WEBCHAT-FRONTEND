import startPage from "../components/NonAuth/startPage.vue"
import HelloWorld from "../components/HelloWorld.vue"
import myFriendPage from "../components/Auth/myFriendPage.vue"
import messagePage from "../components/Auth/messagePage.vue"
import store from "../store/index"
const routes = [{
        path: "/start",
        component: startPage,
        name: "startPage",
        beforeEnter: (to, from, next) => {
            if (store.getters["AUTH/getAuth"] == true) {
                next({ name: "index" })
            } else {
                next()
            }
        }
    },
    {
        path: "/",
        component: HelloWorld,
        beforeEnter: (to, from, next) => {
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