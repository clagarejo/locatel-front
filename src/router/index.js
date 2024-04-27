import { createRouter, createWebHashHistory } from 'vue-router'

import Users from '../components/Users.vue'
import Accounts from '../components/Accounts.vue'


const routes = [
  {
    path: '/',
    name: 'users',
    component: Users
  },

  {
    path: '/accounts',
    name: 'accounts',
    component: Accounts
  },

  

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
