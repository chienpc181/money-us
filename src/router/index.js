import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/auth/Login'
import Signup from '../views/auth/Signup'
import CreatePlayList from '@/views/playlists/CreatePlayList'
import CreateTransaction from '@/views/playlists/CreateTransaction'
import PlaylistDetails from '@/views/playlists/PlaylistDetails'
import AllTransactions from '@/views/playlists/AllTransactions'

//route guard
import { projectAuth } from '@/firebase/config'

const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser
  if (!user) {
    next({ name: 'login'})
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter: requireAuth
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/playlists/create-playlist',
    name: 'create-playlist',
    component: CreatePlayList
  },
  {
    path: '/transactions/all',
    name: 'all-transactions',
    component: AllTransactions
  },
  {
    path: '/transactions/create-transaction',
    name: 'create-transaction',
    component: CreateTransaction
  },
  {
    path: '/playlists/:id',
    name: 'playlist-details',
    component: PlaylistDetails,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
