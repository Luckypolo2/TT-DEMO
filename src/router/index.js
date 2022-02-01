import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login/Login'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login, name: 'login' }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
