// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import '@/mock'
// css  去除默认样式
import '@/assets/css/reset.css'

// 第三方库
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'material-design-icons/iconfont/material-icons.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import VueProgressBar from 'vue-progressbar'

// 自定义组件
import banner from '@/components/banner'
import musicBar from '@/components/musicBar'
import mySheet from '@/components/sheet'
import list from '@/components/list'

// 自定义过滤
import filters from '@/filters'

Vue.config.productionTip = false

Vue.use(MuseUI)
Vue.use(VueAwesomeSwiper)
Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: '#f30',
  height: '2px'
})

Vue.component('my-banner', banner)
Vue.component('music-bar', musicBar)
Vue.component('my-sheet', mySheet)
Vue.component('my-list', list)

// 自定义过滤
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
