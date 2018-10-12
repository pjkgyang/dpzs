import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Mint from 'bh-mint-ui2';
import { Toast } from 'bh-mint-ui2';
import router from './router';
import * as utils from './utils'
import api from './api'
import axios from 'axios'
import 'bh-mint-ui2/lib/style.css'
import 'echarts/map/js/china.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';


// 总线
const EventBus = new Vue();
// import iView from 'iview';
// import 'iview/dist/styles/iview.css';
// Vue.use(iView);
// Vue.prototype.$Spin = iView.Spin
Vue.prototype.API = api;
Vue.prototype.$get = utils.Get;
Vue.prototype.$bus = EventBus;
import './http.js'

if (window.smile) {
  window.Vue = Vue
  window.axios = axios
  if (WEBPACK_CONFIG_HOST) {
      window.WEBPACK_CONFIG_HOST = WEBPACK_CONFIG_HOST
  }
  // 初始化eventBus
//   window.smile.eventBus = new Vue()
}

Vue.use(ElementUI);
Vue.use(Mint);

// Vue.use(VueRouter);
// const router = new VueRouter(route);

router.beforeEach((to, from, next) => {
  // 加载页面smile依赖
  if(to.meta.title){
    utils.util.title(to.meta.title);
    next();
  }

  if (window.smile) {
      var require = []
      var promiseArr = []
      // 拉取require配置中的表单
      if (to.meta.require && to.meta.require.length > 0) {
          require = require.concat(to.meta.require)
      }
      // 拉取传参中的表单
      if (to.query.smileForm) {
          require.push(to.query.smileForm)
      }
      require.map(function(item) {
          if (!window.smile.components[item]) {
              promiseArr.push(window.smile.loadPage(item))
          }
      })
      if (promiseArr.length > 0) {
          Promise.all(promiseArr).then(function() {
              next()
          })
      } else {
          next()
      }
  } else {
      next()
  }

})

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
});
