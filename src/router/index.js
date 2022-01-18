import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';
import Signup from '../views/Signup.vue';
import Signup2 from '../views/Signup2.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: "/signup",
  },
  

  {
    path: '/Home', 
    name: "Acceuil",
    component: Home
  },
  {
    path: '/login',
    name: 'Login', 
    component: Login //() => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/signup2',
    name: 'Signup2',
    component: Signup2
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
