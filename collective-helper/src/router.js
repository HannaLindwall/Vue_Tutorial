import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home.vue'
import Cleaning from './pages/Cleaning.vue'
import Laundry from './pages/Laundry.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'default',
            component: Home
        },
        {
            path: '/home',
            name: 'home',
            component: Home
        },
        {
            path: '/cleaning',
            name: 'cleaning',
            component: Cleaning
        },
        {
            path: '/laundry',
            name: 'laundry',
            component: Laundry
        }
    ]
})
