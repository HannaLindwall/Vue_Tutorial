import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue } from 'bootstrap-vue'
import PrettyCheck from 'pretty-checkbox-vue/check'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import "pretty-checkbox/dist/pretty-checkbox.min.css"


Vue.use(BootstrapVue);
Vue.component('p-check', PrettyCheck);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
