/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import request from '@/utiltools/request'

export default {
  // 共享建站详情
  async asyncGetShareNetIdFun({ state }, id) {
    for (let i = 0; i < state.shareNet.items.length; i += 1) {
      if (state.shareNet.items[i].id == id) {
        return state.shareNet.items[i]
      }
    }
    return false
  },
  // 设置导航标题
  async setTitle(store, title) {
    let flag = false
    if (process.env.isMiniprogram) {
      wx.setNavigationBarTitle({
        title
      })
      flag = true
    }
    return flag
  },
  // 公司信息
  async asyncGetCompanyInfo({ commit }) {
    let flag = false
    const CompanyInfo = await request('/api/services/app/CompanyInfo/GetOrCreate')
    if (CompanyInfo.success) {
      commit('setCompanyInfo', CompanyInfo.result)
      flag = true
    }
    return flag
  },
  // 人才招聘
  async asyncRecruit({ commit }) {
    let flag = false
    const Recruit = await request('/api/services/app/Hr/GetAll')
    if (Recruit.success) {
      commit('setRecruit', Recruit.result)
      flag = true
    }
    return flag
  },
  async asyncRecruitId({ commit }, data) {
    let flag = false
    const RecruitId = await request('/api/services/app/Hr/Get', data)
    if (RecruitId.success) {
      commit('setRecruitId', RecruitId.result)
      flag = true
    }
    return flag
  },
  // 企业邮箱
  async asyncBusinessMail({ commit }, data) {
    let flag = false
    const BusinessMail = await request('/api/services/app/Page/Get', data)
    if (BusinessMail.success) {
      commit('setBusinessMail', BusinessMail.result)
      flag = true
    }
    return flag
  },
  // 虚拟主机
  async asyncHost({ commit }, data) {
    let flag = false
    const Host = await request('/api/services/app/Page/Get', data)
    if (Host.success) {
      commit('setHost', Host.result)
      flag = true
    }
    return flag
  },
  // 虚拟主机
  async asyncIpLogin({ commit }, data) {
    let flag = false
    const IpLogin = await request('/api/services/app/Partner/GetAll', data)
    if (IpLogin.success) {
      commit('setIpLogin', IpLogin.result)
      flag = true
    }
    return flag
  },
  // App开发(只获取当前对象、获取数组展示)
  // 小程序(只获取当前对象、获取数组展示)
  // async asyncAppId(store, data) {
  //   let flag = false
  //   const App = await request('/api/services/app/CatalogGroup/Get', data)
  //   if (App.success) {
  //     // commit('setApp', App.result)
  //     // Storage.set('App', App.result)
  //     flag = true
  //   }
  //   return flag
  // },
  async asyncAppList({ commit }, data) {
    let flag = false
    const App = await request('/api/services/app/Catalog/GetAll', data)
    if (App.success) {
      commit('setApp', App.result)
      flag = true
    }
    return flag
  },
  // 小程序(获取数组展示、id获取详情)
  async asyncMiniApp({ commit }, data) {
    let flag = false
    const MiniApp = await request('/api/services/app/Catalog/GetAll', data)
    if (MiniApp.success) {
      commit('setMiniApp', MiniApp.result)
      flag = true
    }
    return flag
  },
  async asyncMiniAppId({ commit }, data) {
    let flag = false
    const MiniAppId = await request('/api/services/app/Catalog/Get', data)
    if (MiniAppId.success) {
      commit('setMiniAppId', MiniAppId.result)
      flag = true
    }
    return flag
  },
  async asyncMiniAppIdVoteStar({ commit }, data) {
    let flag = false
    const MiniAppIdVoteStar = await request('/api/services/app/Catalog/VoteStar', data, 'POST')
    if (MiniAppIdVoteStar.success) {
      commit('setMiniAppIdVoteStar', MiniAppIdVoteStar.result)
      flag = true
      wx.showToast({
        title: '投票成功',
        icon: 'success',
        duration: 1500
      })
    } else {
      wx.showToast({
        title: '已经投过票',
        icon: 'error',
        duration: 1500
      })
    }
    return flag
  },
  // 共享建站(获取数组展示、id获取详情)
  async asyncShareNet({ commit }, data) {
    let flag = false
    const ShareNet = await request('/api/services/app/Catalog/GetAll', data)
    if (ShareNet.success) {
      commit('setShareNet', ShareNet.result)
      flag = true
    }
    return flag
  },
  async asyncShareNetId({ commit }, data) {
    let flag = false
    const ShareNetId = await request('/api/services/app/Catalog/Get', data)
    if (ShareNetId.success) {
      commit('setShareNetId', ShareNetId.result)
      flag = true
    }
    return flag
  },
  async asyncShareNetIdVoteStar({ commit }, data) {
    let flag = false
    const ShareNetIdVoteStar = await request('/api/services/app/Catalog/VoteStar', data, 'POST')
    if (ShareNetIdVoteStar.success) {
      commit('setShareNetIdVoteStar', ShareNetIdVoteStar.result)
      flag = true
      wx.showToast({
        title: '投票成功',
        icon: 'success',
        duration: 1500
      })
    } else {
      wx.showToast({
        title: '已经投过票',
        icon: 'error',
        duration: 1500
      })
    }
    return flag
  },

  // 调用微信原生登录接口
  async getUserProfile({ state, commit, dispatch }) {
    let user = null
    user = await dispatch('getUserInfo')
    if (user) {
      // user.Login = await dispatch('getLogin')
      commit('setUserInfo', user)
    }
    // if (user && user.Login) {
    //   user.Request = await dispatch('getRequest', user.Login)
    // }
    // if (user && user.Login && user.Request) {
    //   commit('setUserInfo', user)
    //   console.log(user)
    // }
  },
  // 获取用户基本信息
  async getUserInfo() {
    return new Promise((resolve, reject) => {
      wx.getUserProfile({
        desc: '展示用户信息',
        success: (res) => {
          resolve(res)
        },
        fail: () => {
          wx.showToast({
            title: '授权失败',
            icon: 'error',
            duration: 1500
          })
          reject(null)
        }
      })
    })
  },
  // 获取登录信息
  async getLogin({ state, commit, dispatch }) {
    return new Promise((resolve, reject) => {
      wx.login({
        success: (res) => {
          resolve(res)
        },
        fail: () => {
          wx.showToast({
            title: '未获取code',
            icon: 'error',
            duration: 1500
          })
          reject(null)
        }
      })
    })
  },
  // 获取openid
  async getRequest({ state, commit, dispatch }, loginCode) {
    const extConfig = wx.getExtConfigSync ? wx.getExtConfigSync() : ''
    const app = (extConfig && JSON.stringify(extConfig) !== '{}') ? extConfig.app : state.app
    return new Promise((resolve, reject) => {
      wx.request({
        url: `https://api.weixin.qq.com/sns/jscode2session?appid=${app.APPID}` +
          `&secret=${app.SECRET}&js_code=${loginCode.code}&grant_type=authorization_code`,
        success: (res) => {
          resolve(res.data)
        },
        fail: () => {
          wx.showToast({
            title: '未获取openid',
            icon: 'error',
            duration: 1500
          })
          reject(null)
        }
      })
    })
  },


  // 接入微信客服
  async toContactCustomerService({ state, commit, dispatch }, data) {
    // const ACCESS_TOKEN = await dispatch('getACCESSTOKEN')
    // if (ACCESS_TOKEN) {
    //   commit('setUserInfo', ACCESS_TOKEN)
    // }
    // const customerServiceURL = await dispatch('getCustomerServiceURL', ACCESS_TOKEN, {
    //   open_kfid: 'OPEN_KFID', // 客服id
    //   scene: '12345' // 场景值
    // })
    // const toCustomerService = await dispatch('toCustomerService', {
    //   url: customerServiceURL.url, // 客服链接
    // })
    const toCustomerService = await dispatch('toCustomerService', {
      url: 'https://work.weixin.qq.com/kfid/kfc08557271247c7410', // 客服链接
    })
  },
  // 获取access_token
  async getACCESSTOKEN({ state, commit, dispatch }) {
    const extConfig = wx.getExtConfigSync ? wx.getExtConfigSync() : ''
    const wechat = (extConfig && JSON.stringify(extConfig) !== '{}') ? extConfig.wechat : state.wechat
    return new Promise((resolve, reject) => {
      wx.request({
        url: `https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=${wechat.corpid}&corpsecret=${wechat.corpsecret}`,
        method: 'GET',
        success: (res) => {
          resolve(res.data)
        },
        fail: () => {
          wx.showToast({
            title: '未获取ACCESS_TOKEN',
            icon: 'error',
            duration: 1500
          })
          reject(null)
        }
      })
    })
  },
  // 获取 客服链接
  async getCustomerServiceURL({ state, commit, dispatch }, ACCESS_TOKEN, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `https://qyapi.weixin.qq.com/cgi-bin/kf/add_contact_way?access_token=${ACCESS_TOKEN.access_token}`,
        method: 'POST',
        data,
        success: (res) => {
          resolve(res.data)
        },
        fail: () => {
          wx.showToast({
            title: '未获取 客服链接',
            icon: 'error',
            duration: 1500
          })
          reject(null)
        }
      })
    })
  },
  // 接入 客服
  async toCustomerService({ state, commit, dispatch }, data) {
    const extConfig = wx.getExtConfigSync ? wx.getExtConfigSync() : ''
    const wechat = (extConfig && JSON.stringify(extConfig) !== '{}') ? extConfig.wechat : state.wechat
    return new Promise((resolve, reject) => {
      wx.openCustomerServiceChat({
        extInfo: {
          url: data.url
        },
        corpId: wechat.corpId,
        success(res) {
          resolve(res)
        },
        fail: (res) => {
          wx.showToast({
            title: '未能接入客服',
            icon: 'error',
            duration: 1500
          })
          console.log(res)
          reject(null)
        }
      })
    })
  },

  // 提示
  async showToast(store, obj) {
    wx.showToast(obj)
  }
}
