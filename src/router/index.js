import Vue from 'vue'
import Router from 'vue-router'
import index from '@/page/index/index'
import detail from '@/page/detail/detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: index
    },
    {
      path: '/detail/:id',
      component: detail
    }
  ]
})
