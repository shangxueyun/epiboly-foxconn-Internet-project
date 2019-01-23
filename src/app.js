import Vue from 'vue'
import VueLodash from 'vue-lodash'
import axios from 'axios';
import echarts from 'echarts'

import Main from './Main'
import Login from './Login'
import router from './router'
import iView from 'iview';
import moment from 'moment'
import store from './store.js'

import './assets/scss/iview-custom.less';

import './assets/scss/style.scss';

Vue.config.productionTip = false

Vue.use(VueLodash);
Vue.use(iView);

axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;
Vue.prototype.$moment = moment;

let sign_up = false
if(sign_up) {
  new Vue({
    el: '#app',
    router: router,
    components: { Login },
    template: '<Login/>'
  })
} else {
  new Vue({
    el: '#app',
    router: router,
    components: { Main },
    template: '<Main/>'
  })
}
