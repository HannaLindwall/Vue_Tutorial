import Vue from 'vue'
import routes from './routes'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import PrettyCheck from 'pretty-checkbox-vue/check';


Vue.component('p-check', PrettyCheck);
Vue.component('InputText', InputText)
Vue.component('Button', Button)
Vue.component('p-calendar', calendar)

import 'primevue/resources/themes/nova-light/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

const app = new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      const matchingView = routes[this.currentRoute]
      return matchingView
        ? require('./pages/' + matchingView + '.vue')
        : require('./pages/404.vue')
    }
  },
  render (h) {
    return h(this.ViewComponent)
  }
})

window.addEventListener('popstate', () => {
  app.currentRoute = window.location.pathname
})
