<template>
  <div class="userInfo0"
    :style="'background: ' + background">
    <div class="backTextUserInfo">{{backText}}</div>
    <div class="bodyUserInfo">
      <div class="title ellipsis">{{backText}}</div>
      <div class="contact">
          <!-- open-type="contact"
          show-message-card="true"
          :session-from="'联系客服'"
          :send-message-title="CompanyInfo.logoText" -->
        <wx-button class="contactItem"
          hover-class="contactItemActive"
          hover-start-time="50"
          hover-stay-time="300"
          @click="toContactCustomerService()">
          <wx-image class="contactImg" src="../../assets/svgs/personal/contact-sms.svg"/>
        </wx-button>
        <wx-button class="contactItem"
          hover-class="contactItemActive"
          hover-start-time="50"
          hover-stay-time="300"
          @click="phoneClick(CompanyInfo.tel)">
          <wx-image class="contactImg" src="../../assets/svgs/personal/contact-phone.svg"/>
        </wx-button>
      </div>
    </div>
    <div class="imgUserInfo">
      <wx-block v-if="!userInfo" class="blockUserInfo">
        <div class="userinfo_avatar" @click="getUserProfile()">
          <wx-image class="ImgTouxiang"
            src="../../assets/svgs/login_touxiang.svg"
            mode="aspectFill" />
        </div>
        <div class="user_Info" @click="getUserProfile()">
          <div class="login">点击授权</div>
        </div>
      </wx-block>
      <wx-block v-else class="blockUserInfo">
        <div class="userinfo_avatar">
          <wx-image class="ImgTouxiang" :src="userInfo.userInfo.avatarUrl" mode="aspectFill"/>
        </div>
        <div class="user_Info">
          <div class="hello">
            <div class="name ellipsis">{{userInfo.userInfo.nickName}}</div>
          </div>
        </div>
      </wx-block>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'UserInfo',
  computed: {
    ...mapState([]),
    ...mapGetters(['wx']),
    ...mapGetters({
      CompanyInfo: 'getCompanyInfo',
      userInfo: 'getUserInfo'
    }),
  },
  props: {
    background: {
      type: String,
      default: 'linear-gradient(107.16deg, #61D2C4 -9.45%, #29D890 85.23%)'
    },
    backText: {
      type: String,
      default: '共享建站'
    }
  },
  data() {
    return {

    }
  },
  created() {
    // eslint-disable-next-line no-unused-vars
    window.addEventListener('wxload', async (query) => {
      // 1
    })
    window.addEventListener('wxshow', async () => {
      await this.asyncGetCompanyInfo()
      await this.init()
    })
    // window.addEventListener('wxready', () => console.log('page2 wxready'))
    // window.addEventListener('wxhide', () => console.log('page2 wxhide'))
    // window.addEventListener('wxunload', () => console.log('page2 wxunload'))
  },
  mounted() {

  },
  methods: {
    ...mapActions(['getUserProfile', 'asyncGetCompanyInfo']),
    ...mapActions(['toContactCustomerService']),

    async init() {
      // const
    },
    phoneClick(phoneTel) {
      const wx = this.wx
      if (process.env.isMiniprogram) {
        wx.showModal({
          title: '',
          content: `呼叫：${phoneTel}`,
          confirmText: '呼叫',
          confirmColor: '#2DDA93', // 主操作字体颜色
          cancelText: '取消',
          cancelColor: '#999', // 次要操作字体颜色
          success(res) {
            if (res.confirm) {
              // 用户点击了主要操作
              wx.makePhoneCall({
                phoneNumber: phoneTel,
                success() {
                  console.log('拨号成功')
                },
                // eslint-disable-next-line no-unused-vars
                fail(err) {
                  console.log('拨号失败')
                }
              })
            } else if (res.cancel) {
              // 用户点击了次要操作
              // 用户返回默认点击次要操作
            }
          }
        })
      }
    }
  },
}
</script>
<style lang="less">
.h5-div.userInfo0 {
  width: 100%;
  height: 258rpx;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  background: linear-gradient(107.16deg, #61D2C4 -9.45%, #29D890 85.23%);
  position: relative;
  margin-bottom: 0rpx;
  .backTextUserInfo{
    max-width: 535rpx;
    position: absolute;
    right: -10px;
    bottom: 0rpx;
    font-size: 135rpx;
    font-weight: 400;
    line-height: 150rpx;
    color: rgba(255, 255, 255, 0.15);
    overflow: hidden;
    white-space: nowrap;
  }
  .bodyUserInfo{
    position: absolute;
    top: 70rpx;
    left: 75rpx;
    .title{
      max-width: 475rpx;
      color: white;
      font-weight: 600;
      font-size: 44rpx;
      letter-spacing: 3rpx;
    }
    .contact{
      width: 165rpx;
      padding-top: 35rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .contactItem{
        width: 73rpx;
        height: 73rpx;
        background: rgba(255, 255, 255, 0.75);
        box-shadow: 4px 4px 20px rgba(51, 228, 155, 0.3);
        border-radius: 50%;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        padding: 17rpx;
        -webkit-tap-highlight-color: transparent;
        .contactImg{
          width: 100%;
          height: 100%;
        }
      }
      .contactItemActive{
        background-color: rgba(255, 255, 255, 1);
      }
    }
  }
  .imgUserInfo{
    position: absolute;
    top: 56%;
    right: 50rpx;
    transform: translate(0%, -50%);
    .blockUserInfo{
      width: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      .userinfo_avatar{
        width: 100rpx;
        height: 100rpx;
        border-radius: 50%;
        overflow: hidden;
        box-sizing: border-box;
        .ImgTouxiang{
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: transparent;
          -webkit-tap-highlight-color: transparent;
        }
      }
      .user_Info{
        color: #fff;
        .hello{
          padding-top: 20rpx;
          font-size: 30rpx;
          font-weight: 600;
          text-align: center;
          .name{
            white-space: nowrap;
            display: inline-block;
            max-width: 200rpx;
          }
        }
        .login{
          padding-top: 20rpx;
          font-size: 30rpx;
        }
      }
    }
  }
}
</style>
