/* eslint-disable no-unused-vars */
/* eslint-disable import/newline-after-import */
import Storage from '@/utiltools/storage'
export default {
  getCompanyInfo(state, item) {
    try {
      return state.CompanyInfo ? state.CompanyInfo : Storage.get('CompanyInfo')
    } catch (e) {
      return ''
    }
  },
  getRecruit(state, item) {
    try {
      return state.Recruit ? state.Recruit : Storage.get('Recruit')
    } catch (e) {
      return ''
    }
  },
  getRecruitId(state, item) {
    try {
      return state.RecruitId ? state.RecruitId : Storage.get('RecruitId')
    } catch (e) {
      return ''
    }
  },
  getBusinessMail(state, item) {
    try {
      return state.BusinessMail ? state.BusinessMail : Storage.get('BusinessMail')
    } catch (e) {
      return ''
    }
  },
  getHost(state, item) {
    try {
      return state.Host ? state.Host : Storage.get('Host')
    } catch (e) {
      return ''
    }
  },
  getIpLogin(state, item) {
    try {
      return state.IpLogin ? state.IpLogin : Storage.get('IpLogin')
    } catch (e) {
      return ''
    }
  },
  getApp(state, item) {
    try {
      return state.App ? state.App : Storage.get('App')
    } catch (e) {
      return ''
    }
  },
  getMiniApp(state, item) {
    try {
      return state.MiniApp ? state.MiniApp : Storage.get('MiniApp')
    } catch (e) {
      return ''
    }
  },
  getMiniAppId(state, item) {
    try {
      return state.MiniAppId ? state.MiniAppId : Storage.get('MiniAppId')
    } catch (e) {
      return ''
    }
  },
  getShareNet(state, item) {
    try {
      return state.ShareNet ? state.ShareNet : Storage.get('ShareNet')
    } catch (e) {
      return ''
    }
  },
  getShareNetId(state, item) {
    try {
      return state.ShareNetId ? state.ShareNetId : Storage.get('ShareNetId')
    } catch (e) {
      return ''
    }
  },

  getUserInfo(state, item) {
    try {
      return state.userInfo ? state.userInfo : Storage.get('userInfo')
    } catch (e) {
      return ''
    }
  },

  getHeader(state) {
    return state.header
  },
  wx() {
    return wx
  }
}
