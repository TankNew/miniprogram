import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    header: {
      culture: 'zh-CN', // en
      tenantId: 32,

      theme: '',
    },

    wechat: {
      corpId: 'ww4f37a0c7ba7c577e',
      corpsecret: ''
    },

    // 腾讯地图
    tencentMap: {
      key: 'CVKBZ-GBKCJ-43LF2-FXENO-QEKT7-Z3BCF'
    },
    // 主页
    funNum: 0,
    funList: [
      {
        img: '../../assets/svgs/home/recruit-green.svg',
        imgAction: '../../assets/svgs/home/recruit-white.svg',
        text: '人才招聘'
      }, {
        img: '../../assets/svgs/home/online-service-green.svg',
        imgAction: '../../assets/svgs/home/online-service-white.svg',
        text: '在线客服'
      }, {
        img: '../../assets/svgs/home/help-file-green.svg',
        imgAction: '../../assets/svgs/home/help-file-white.svg',
        text: '帮助文档'
      }
    ],

    // tabbar导航栏
    tabbar: {
      home: {
        img: '../../assets/svgs/tabbar/home-white.svg',
        imgAction: '../../assets/svgs/tabbar/home-green.svg',
        text: '首页'
      },
      personal: {
        img: '../../assets/svgs/tabbar/personal-white.svg',
        imgAction: '../../assets/svgs/tabbar/personal-green.svg',
        text: '个人中心'
      },
    },
    tabbar_fun_list: {
      left: [
        {
          text: '域名注册',
          img: '../../assets/svgs/tabbarFun/ip-login.svg',
          route: '/zh-CN/IpLogin',
          color: '#739FBB'
        }, {
          text: '共享建站',
          img: '../../assets/svgs/tabbarFun/share-net.svg',
          route: '/zh-CN/ShareNet',
          color: '#4FC1BB'
        }
      ],
      center: [
        {
          text: '企业邮箱',
          img: '../../assets/svgs/tabbarFun/business-mail.svg',
          route: '/zh-CN/BusinessMail',
          color: '#BD81C2'
        }, {
          text: '虚拟主机',
          img: '../../assets/svgs/tabbarFun/invented-host.svg',
          route: '/zh-CN/Host',
          color: '#A9B79D'
        }, {
          text: '多彩小程序',
          img: '../../assets/svgs/tabbarFun/wechat-miniApp.svg',
          route: '/zh-CN/MiniApp',
          color: '#39B54A'
        }, {
          text: '微信公众号',
          img: '../../assets/svgs/tabbarFun/wechat-publicNum.svg',
          route: '/zh-CN/WechatPublicNum',
          color: '#39B54A'
        }
      ],
      right: [
        {
          text: 'App开发',
          img: '../../assets/svgs/tabbarFun/app-development.svg',
          route: '/zh-CN/App',
          color: '#F99898'
        }, {
          text: '招聘',
          img: '../../assets/svgs/tabbarFun/recruit.svg',
          route: '/zh-CN/Recruit',
          color: '#8080FF'
        }
      ],
    },

    // 用户中心
    // 功能业务
    personal_fun: [
      {}, {
        title: '您的业务清单',
        total: 3,
        date: '2021-02-01T12:33:00',
        wechat: {
          text: '多彩小程序',
          img: '../../assets/svgs/personal/wechat.svg',
          color: '#2DDA93',
          route: '/zh-CN/MiniApp'
        },
        shareNet: {
          text: '共享建站',
          img: '../../assets/images/shareNet-logo.png',
          color: '#75BEFF',
          route: '/zh-CN/ShareNet'
        },
        app: {
          text: 'App开发',
          img: '../../assets/svgs/personal/app.svg',
          color: '#B180D7',
          route: '/zh-CN/App'
        }
      }, {

      }
    ],


    // 信息
    CompanyInfo: null,

    // 人才招聘
    Recruit: null,
    RecruitId: null,

    // 企业邮箱
    BusinessMail_id: 99,
    BusinessMail: null,

    // 虚拟主机
    Host_id: 100,
    Host: null,

    // 域名注册
    IpLogin: null,

    // App开发
    App_id: 463,
    App: null,

    // 小程序
    MiniApp_id: 464,
    MiniApp: null,
    // 小程序详情
    MiniAppId: null,

    // 共享建站
    ShareNet_id: 465,
    ShareNet: null,
    // 共享建站详情
    ShareNetId: null,

    // 微信个人信息
    userInfo: null,
  },
  mutations,
  getters,
  actions,
})
