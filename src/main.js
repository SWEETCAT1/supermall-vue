import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "@/store";

import VueLazyload from "vue-lazyload";

import toast from '@/components/common/toast'

Vue.config.productionTip = false

// 新建Vue实例作为bus总线
Vue.prototype.$bus = new Vue()

Vue.use(toast)

//解决移动端的延迟
// FastClick.attach(document.body)

//使用图片懒加载插件
Vue.use(VueLazyload,{
  loading:require('assets/img/common/placeholder.png')
})

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
