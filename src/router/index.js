import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home';
import Options from '@/views/Options';
import Login from '@/views/Login';
import store from '../store'

Vue.use(Router);

const router =  new Router({
  routes: [
    { path: '/', component: Home, name: 'home' },
    { path: '/options', component: Options, name: 'options' },
    { path: '/login', component: Login, name: 'login' }
  ],
});

router.beforeEach((to, from, next) => {
  if (to.name != 'login') {
    if (store.state.isLoggedIn) {
      next();
    } else {
      console.log('redirecting to login')
      router.push('login');
    }
  } else {
    next();
  }
})

export default router;