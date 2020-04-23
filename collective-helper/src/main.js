import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue } from 'bootstrap-vue'
import PrettyCheck from 'pretty-checkbox-vue/check'
import Calendar from "primevue/calendar"

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import "pretty-checkbox/dist/pretty-checkbox.min.css"
import 'primevue/resources/themes/nova-light/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'


Vue.use(BootstrapVue);
Vue.component('p-check', PrettyCheck);
Vue.component("p-calendar", Calendar)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
