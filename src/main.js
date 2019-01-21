import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Buefy from 'buefy'
import router from './router'
import { LoaderPlugin } from 'vue-google-login'

const CLIENT_ID = '149567073095-00dhjgk3le1j1v658enk23j4j6pelvos.apps.googleusercontent.com'

Vue.use(Buefy)
Vue.use(LoaderPlugin, {
  client_id: CLIENT_ID
})

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
