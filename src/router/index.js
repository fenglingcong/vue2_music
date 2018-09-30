import Vue from 'vue'
import Router from 'vue-router'

// 懒加载路由页面资源（减小应用体积，加快首次加载速度）
const index = () => import('@/page/index/index')
const detail = () => import('@/page/detail/detail')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      component: index
    },
    {
      path: '/detail/:id',
      component: detail
    },
    // url输入有误，统一跳回主页
    {
      path: '*',
      redirect: '/index'
    }
  ]
})
