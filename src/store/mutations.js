/* eslint-disable no-plusplus */
import Storage from '@/utiltools/storage'

export default {
  setCompanyInfo(state, item) {
    state.CompanyInfo = item
    Storage.set('CompanyInfo', item)
  },
  setRecruit(state, item) {
    state.Recruit = item
    Storage.set('Recruit', item)
  },
  setRecruitId(state, item) {
    state.RecruitId = item
    Storage.set('RecruitId', item)
  },
  setBusinessMail(state, item) {
    state.BusinessMail = item
    Storage.set('BusinessMail', item)
  },
  setHost(state, item) {
    state.Host = item
    Storage.set('Host', item)
  },
  setIpLogin(state, item) {
    state.IpLogin = item
    Storage.set('IpLogin', item)
  },
  setApp(state, item) {
    state.App = item
    Storage.set('App', item)
  },
  setMiniApp(state, item) {
    state.MiniApp = item
    Storage.set('MiniApp', item)
  },
  setMiniAppId(state, item) {
    state.MiniAppId = item
    Storage.set('MiniAppId', item)
  },
  setMiniAppIdVoteStar(state, item) {
    state.MiniAppId.star = item
    Storage.set('MiniAppId', state.MiniAppId)
  },
  setShareNet(state, item) {
    state.ShareNet = item
    Storage.set('ShareNet', item)
  },
  setShareNetId(state, item) {
    state.ShareNetId = item
    Storage.set('ShareNetId', item)
  },
  setShareNetIdVoteStar(state, item) {
    state.ShareNetId.star = item
    Storage.set('ShareNetId', state.ShareNetId)
  },

  setUserInfo(state, item) {
    const getGUID = (prefix) => {
      let guid = (+new Date()).toString(32)
      for (let i = 0; i < 5; i++) {
        guid += Math.floor(Math.random() * 65535).toString(32)
      }
      return (prefix || 'guid_') + guid
    }
    // eslint-disable-next-line no-param-reassign
    item.guidID = getGUID()
    console.log(item)
    state.userInfo = item
    Storage.set('userInfo', item)
  },

}
