import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login/Login'
import Layout from '@/views/Layout/Layout'
import Home from '@/views/Home/Home'
import Qa from '@/views/Qa/Qa'
import Video from '@/views/Video/Video'
import My from '@/views/My/My'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login, name: 'login' },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      { path: '/home', component: Home, name: 'home' },
      { path: '/qa', component: Qa, name: 'qa' },
      { path: '/video', component: Video, name: 'video' },
      { path: '/my', component: My, name: 'my' }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
