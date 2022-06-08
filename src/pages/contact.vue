<template>
  <div class="Container ContainerContact scrollbar" id="Container" @click="unFunListViewFun()">
    <div class="userInfo0" id="top">
      <UserInfo backText='联系方式'></UserInfo>
    </div>
    <wx-map class="ContactMap"
      v-if="viewMap"
      :longitude="longitude"
      :latitude="latitude"
      :scale="scale"
      :markers="markers"
    ></wx-map>
    <div class="ContactType"
      v-if="CompanyInfo">
      <wx-image class="addressImg" src="../../assets/svgs/contact/location.svg" mode="aspectFit"/>
      <div class="bodyContact">
        <div class="item" v-if="CompanyInfo.appName">
          <div class="left">
            <wx-image class="img" src="../../assets/svgs/contact/location-mini.svg" />
            公司名称:
          </div>
          <div class="right">
            <div class="name corporateName ellipsis2">{{CompanyInfo.appName}}</div>
          </div>
        </div>
        <div class="item" v-if="CompanyInfo.appAddress">
          <div class="left">
            <wx-image class="img" src="../../assets/svgs/contact/location-mini.svg" />
            地址:
          </div>
          <div class="right">
            <div class="name address ellipsis2">{{CompanyInfo.appAddress}}</div>
          </div>
        </div>
        <div class="item" v-if="CompanyInfo.tel">
          <div class="left">
            <wx-image class="img" src="../../assets/svgs/contact/phone-mini.svg" />
            电话:
          </div>
          <div class="right">
            <div class="name phoneNum ellipsis2">{{CompanyInfo.tel}}</div>
          </div>
        </div>
        <div class="item" v-if="CompanyInfo.email">
          <div class="left">
            <wx-image class="img" src="../../assets/svgs/contact/mail-mini.svg" />
            邮箱:
          </div>
          <div class="right">
            <div class="name email ellipsis2">{{CompanyInfo.email}}</div>
          </div>
        </div>
      </div>
        <!-- :src="../../assets/images/ednet-erweima.png" -->
      <wx-image class="erweima"
        show-menu-by-longpress="true"
        :src="CompanyInfo.weixinBarCode"
        mode="aspectFit"/>
    </div>
    <div class="bottom">
      <Tabbar ref="tabbars"></Tabbar>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-trailing-spaces */
import Vue from 'vue'
import { mapState, mapGetters, mapActions } from 'vuex'
import UserInfo from '@/components/userInfo.vue'
import Tabbar from '@/components/tabbar.vue'
import QQMapWX from '@/utiltools/qqmap-wx-jssdk.min'

export default Vue.extend({
  name: 'Contact',
  components: {
    UserInfo,
    Tabbar
  },
  computed: {
    ...mapState(['tencentMap']),
    ...mapGetters({
      CompanyInfo: 'getCompanyInfo',
    }),
  }, 
  data() {
    return {
      scale: 13,
      latitude: '38',
      longitude: '115',
      markers: [],

      viewMap: false
    }
  },
  created() {
    // eslint-disable-next-line no-unused-vars
    window.addEventListener('wxload', async (query) => {
      this.setTitle('联系方式')
    })
    // window.addEventListener('wxshow', async () => {
    //   await this.asyncGetCompanyInfo()
    //   this.init()
    // })
    window.addEventListener('wxready', async () => {
      await this.asyncGetCompanyInfo()
      this.init()
    })
  },
  methods: {
    ...mapActions(['setTitle', 'asyncGetCompanyInfo', 'showToast']),

    async init() {
      this.location()
    },
    
    location() {
      this.showToast({
        title: '正在定位',
        icon: 'loading',
        duration: 10000
      })
      const qqMap = new QQMapWX({
        key: this.tencentMap.key
      })
      if (this.CompanyInfo.appAddress && this.CompanyInfo.appAddress) {
        qqMap.geocoder({
          address: this.CompanyInfo.appAddress, // "天津市河北区荣强里5号楼"
          success: (res) => {
            // eslint-disable-next-line eqeqeq
            if (res.status == 0) {
              const location = res.result.location
              this.latitude = location.lat
              this.longitude = location.lng
              this.markers = [{
                id: 1,
                latitude: location.lat,
                longitude: location.lng,
                width: `${48}rpx`,
                height: `${72}rpx`,
                // iconPath: this.CompanyInfo.CompanyInfo.logo,
                title: this.CompanyInfo.appAddress
              }]
              this.viewMap = true
              wx.hideToast()
            } else {
              this.viewMap = false
              wx.hideToast()
              wx.showModal({
                title: '未能获取经纬度',
                content: '获取经纬度失败，将不显示地图',
                confirmText: '确认',
                confirmColor: '#000',
                showCancel: false
              })
            }
          },
          fail: (res) => {
            console.log(res)
            // this.setData({ head: false })
            wx.hideToast()
            wx.showModal({
              title: '未能获取经纬度',
              content: '获取经纬度失败，将不显示地图',
              confirmText: '确认',
              confirmColor: '#000',
              showCancel: false
            })
          }
        })
      } else {
        this.viewMap = false
        wx.hideToast()
        wx.showModal({
          title: '',
          content: '没有设置地址信息',
          confirmText: '确认',
          confirmColor: '#999',
          showCancel: false
        })
      }
    },
    
    // 关闭tabbarFun
    unFunListViewFun() {
      this.$refs.tabbars.unFunListViewFun()
    },
  },
})
</script>
<style lang="less">
.Container.ContainerContact{
  box-sizing: border-box;
  background-color: #FBFDFF;
  .userInfo0{
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    margin-bottom: unset;
  }
  .ContactMap{
    width: 100%;
    height: 450rpx;
  }
  .ContactType{
    width: 676rpx;
    margin: 0 auto;
    background-color: white;
    box-shadow: 0rpx 8rpx 30rpx rgba(0, 0, 0, 0.1);
    border-radius: 15rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    padding: 30rpx 45rpx 40rpx;
    margin-top: 30rpx;
    margin-bottom: 35rpx;
    .addressImg{
      width: 225rpx;
      height: 225rpx;
      padding-top: 50rpx;
    }
    .bodyContact{
      width: 100%;
      padding-top: 75rpx;
      .item{
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        padding-bottom: 20rpx;
        .left{
          width: 31%;
          display: flex;
          align-items: center;
          font-weight: 400;
          font-size: 29rpx;
          color: #666666;
          .img{
            width: 37rpx;
            height: 37rpx;
            padding-right: 15rpx;
          }
        }
        .right{
          width: calc(69% - 8rpx);
          height: 75rpx;
          .name{
            width: 100%;
            font-weight: 400;
            font-size: 29rpx;
            line-height: 40rpx;
            color: #666666;
          }
        }
      }
      .item:last-child{
        padding-bottom: 0rpx;
      }
    }
    .erweima{
      width: 200rpx;
      height: 200rpx;
      margin-top: 25rpx;
      box-shadow: 0rpx 0rpx 15rpx #FFB946;
    }
  }
  .bottom{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
  }
}
</style>
