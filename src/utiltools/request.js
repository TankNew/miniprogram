import url0 from '@/utiltools/url'
import store from '@/store'

export default(url, data = {}, method = 'GET') => new Promise((resolve, reject) => {
  const extConfig = wx.getExtConfigSync ? wx.getExtConfigSync() : ''
  let header = (extConfig && JSON.stringify(extConfig) !== '{}') ? extConfig.header : store.getters.getHeader
  if (!(typeof (header.tenantId) === 'number' && typeof (header.culture) === 'string')) header = store.getters.getHeader
  wx.request({
    url: url0.host + url,
    header: {
      'content-type': 'application/json',
      '.AspNetCore.Culture': header.culture,
      'Abp.TenantId': header.tenantId
    },
    data,
    method,
    success: (res) => {
      resolve(res.data)
    },
    fail: (err) => {
      console.log('失败：', err)
      reject(err)
    }
  })
})
