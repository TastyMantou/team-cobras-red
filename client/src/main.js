import Vue from 'vue'
import App from './App'

import Home from './components/Home.vue'
import TodoList from './components/TodoList.vue'
import Login from './components/Login.vue'
import Signup from './components/Signup.vue'
import Account from './components/Account.vue'
import PasswordRecover from './components/PasswordRecover.vue'
import PasswordChange from './components/PasswordChange.vue'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.use(VueRouter)

const router = new VueRouter()

router.map({
  '/home': {
  	component: Home
  },
  '/login': {
  	component: Login
  },
  '/signup': {
  	component: Signup
  },
  '/todo': {
	component: TodoList
  },
  '/account': {
	component: Account
  },
  '/passwordRecover': {
  	component: PasswordRecover
  },
  '/passwordChange': {
  	component: PasswordChange
  }
})

// redirect all other requests to home
router.redirect({
  '*': '/home'
})

router.start(App, 'app')