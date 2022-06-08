import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App.vue'
import store from '@/store'

import Guide from '@/pages/guide.vue'

import Home from '@/pages/home.vue'
import Personal from '@/pages/personal.vue'
import ShareNet from '@/pages/shareNet.vue'
import ShareNetDetail from '@/pages/shareNetDetail.vue'
import MiniApp from '@/pages/miniApp.vue'
import MiniAppDetail from '@/pages/miniAppDetail.vue'
import IpLogin from '@/pages/ipLogin.vue'
import BusinessMail from '@/pages/businessMail.vue'
import Host from '@/pages/host.vue'
import App0 from '@/pages/app.vue'
import Contact from '@/pages/contact.vue'
import Recruit from '@/pages/recruit.vue'
import RecruitDetail from '@/pages/recruitDetail.vue'

import '@/styles/style.less' // 引入样式

Vue.use(Router)


const router = new Router({
  mode: 'history',
  routes: [{
    path: '/(Guide|index)?',
    name: 'Guide',
    component: Guide,
  }, {
    path: '/index.html',
    name: 'GuideHtml',
    component: Guide,
  }, {
    path: '/zh-CN/Guide',
    name: 'Guide',
    component: Guide,
  },

  {
    path: '/zh-CN/(Home|index)',
    name: 'HomeTest',
    component: Home,
  }, {
    path: '/zh-CN/Personal',
    name: 'Personal',
    component: Personal,
  }, {
    path: '/zh-CN/ShareNet',
    name: 'ShareNet',
    component: ShareNet,
  }, {
    path: '/zh-CN/ShareNet/:id',
    name: 'ShareNetDetail',
    component: ShareNetDetail,
  }, {
    path: '/zh-CN/MiniApp',
    name: 'MiniApp',
    component: MiniApp,
  }, {
    path: '/zh-CN/MiniApp/:id',
    name: 'MiniAppDetail',
    component: MiniAppDetail,
  }, {
    path: '/zh-CN/IpLogin',
    name: 'IpLogin',
    component: IpLogin,
  }, {
    path: '/zh-CN/BusinessMail',
    name: 'BusinessMail',
    component: BusinessMail,
  }, {
    path: '/zh-CN/Host',
    name: 'Host',
    component: Host,
  }, {
    path: '/zh-CN/App',
    name: 'App',
    component: App0,
  }, {
    path: '/zh-CN/Contact',
    name: 'Contact',
    component: Contact,
  }, {
    path: '/zh-CN/Recruit',
    name: 'Recruit',
    component: Recruit,
  }, {
    path: '/zh-CN/Recruit/:id',
    name: 'RecruitDetail',
    component: RecruitDetail,
  }],
})

export default function createApp() {
  const container = document.createElement('div')
  container.id = 'app'
  document.body.appendChild(container)

  Vue.config.productionTip = false

  return new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
  })
}
