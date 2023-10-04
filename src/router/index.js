import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Forum from '../views/Forum/Forum.vue'
import SignUp from '../views/SignUp.vue'
import Login from '../views/Login.vue'
import MyAccount from '../views/MyAccount.vue'
import store from '@/store'
import SpotifyLogin from '../views/Spotify/Login.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/log-in',
    name: 'Login',
    component: Login
  },
  {
    path: '/my-account',
    name: 'My Account',
    component: MyAccount,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/spotify/callback',
    name: 'spotify-callback',
    component: SpotifyLogin, // Replace with your component
    props: route => ({
      code: route.query.code,
      state: route.query.state
    })
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/gallary',
    name: 'gallary',
    component: () => import('../views/GalleryView.vue')
  },
  {
    path: '/forums',
    name: 'forums',
    component: () => import(/* webpackChunkName: "about" */ '../views/Forum/ForumsView.vue')
  },
  {
    path: '/create-forum',
    name: 'Create Forum',
    component: () => import(/* webpackChunkName: "about" */ '../views/Forum/CreateForum.vue')
  },
  {
    path: '/:category_slug/:forum_slug/',
    name: 'forum',
    component: Forum
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
    next({ name: 'Login', query: { to: to.path } })
  } else {
    next()
  }
})

export default router
