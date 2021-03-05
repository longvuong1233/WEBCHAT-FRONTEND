import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import VueRouter from "vue-router"


import routes from "./routes/index"
import vuetify from './plugins/vuetify';

import store from "./store/index"
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

Vue.config.productionTip = false

Vue.use(VueRouter)

const router = new VueRouter({
    routes
})



new Vue({
    render: h => h(App),
    vuetify,
    router,
    store
}).$mount('#app')