import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    meta: { guess: true },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/inventory',
    name: 'Inventory',
    meta: { login: true },
    component: () => import('../views/Inventory.vue')
  },
  {
    path: '/Employees',
    name: 'Employees',
    meta: { login: true },
    component: () => import('../views/Employee.vue')
  },
  {
    path: '/partners',
    name: 'Partners',
    meta: { login: true },
    component: () => import('../views/Partner.vue')
  },
  {
    path: '/home',
    name: 'Transaction',
    meta: { login: true },
    component: () => import('../views/Transaction.vue')
  },
  {
    path: '/trans/:id',
    name: 'TransactionDetail',
    component: () => import('../views/DetailTran.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('token')

  if (to.meta.login && !isLoggedIn){
    alert('Please login first!')
    next({ path: '/' })
  }

  if (to.meta.guess && isLoggedIn){
    alert("You've already logged in")
    next({ path: '/home'})
  }

  next()
})

export default router