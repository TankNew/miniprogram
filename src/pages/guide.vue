<template>
  <div class="Container ContainerGuide">
    <wx-image src="../../assets/images/guide_background.png"
      mode="aspectFill"
      style="width: 100%;height: 100%;"/>
    <div class="back_plate"></div>
    <div class="header" v-if="CompanyInfo">
      <div class="logeTitle ellipsis2">
        {{ CompanyInfo.logoText }}
      </div>
      <div class="logoText ellipsis">
        {{ CompanyInfo.contacter }}
      </div>
    </div>
    <div class="body" v-if="CompanyInfo">
      <div class="left">
        <wx-view class="contactUsBtn"
          v-if="CompanyInfo.email"
          hover-class="action"
          hover-start-time="50"
          hover-stay-time="200"
          @click="emailClick(CompanyInfo.email)">
          <wx-image src="../../assets/svgs/guide/email-person.svg" class="imgEmail"/>
        </wx-view>
      </div>
      <div class="center"
        :class="animation ? 'centerChange' : ''"
        :style="animation ? '' : 'transform: translate(' + 0 + 'px, ' + moveY + 'px);'
          + 'opacity: ' + ((140 + moveY) / 120 ) + ';'">
        <div class="enterBtn"
          @touchstart="changeTouchStartFun($event, false)"
          @touchmove="touchMoveFun($event)"
          @touchend="changeTouchEndFun($event, true)">
          <wx-image src="../../assets/svgs/guide/top-button.svg" class="imgEnterBtn"></wx-image>
        </div>
      </div>
      <div class="right">
        <wx-view class="contactUsBtn"
          v-if="CompanyInfo.tel"
          hover-class="action"
          hover-start-time="50"
          hover-stay-time="200"
          @click="phoneClick(CompanyInfo.tel)">
          <wx-image src="../../assets/svgs/guide/phone-call.svg" class="imgTel"/>
        </wx-view>
      </div>
    </div>
    <div class="footer"
      :style="animation ? '' : 'transform: translate(' + 0 + 'px, ' + moveY + 'px);'
        + 'opacity: ' + ((140 + moveY) / 120 ) + ';'">
      <div class="pointChange"
        :class="animation ? 'change0' : ''"></div>
      <div class="pointChange"
        :class="animation ? 'change1' : ''"></div>
      <div class="pointChange"
        :class="animation ? 'change2' : ''"></div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapActions, mapGetters, mapState } from 'vuex'

import PageUrl from '@/utiltools/pageUrl'

export default Vue.extend({
  name: 'Guide',
  computed: {
    ...mapState([]),
    ...mapGetters(['wx']),
    ...mapGetters({
      CompanyInfo: 'getCompanyInfo',
    }),
    moveX() {
      return this.lengthNum.end_pageX - this.lengthNum.start_pageX
    },
    moveY() {
      if (this.lengthNum.end_pageY - this.lengthNum.start_pageY >= 0) return 0
      if (this.lengthNum.end_pageY - this.lengthNum.start_pageY < -120) return -120
      return this.lengthNum.end_pageY - this.lengthNum.start_pageY
    }
  },
  data() {
    return {
      animation: true,
      lengthNum: {
        start_pageX: 0,
        start_pageY: 0,
        end_pageX: 0,
        end_pageY: 0,
      },
    }
  },
  created() {
    // eslint-disable-next-line no-unused-vars
    window.addEventListener('wxload', async (query: any) => {
      this.setTitle('引导页')
    })
    window.addEventListener('wxshow', async () => {
      await this.asyncGetCompanyInfo()
    })
    // window.addEventListener('wxready', () => console.log('page2 wxready'))
    // window.addEventListener('wxhide', () => console.log('page2 wxhide'))
    // window.addEventListener('wxunload', () => console.log('page2 wxunload'))
  },
  methods: {
    ...mapActions(['setTitle', 'asyncGetCompanyInfo', 'showToast']),
    changeTouchStartFun(touch, bool) {
      this.lengthNum.start_pageX = touch.$_changedTouches[0].clientX
      this.lengthNum.start_pageY = touch.$_changedTouches[0].clientY
      this.lengthNum.end_pageX = touch.$_changedTouches[0].clientX
      this.lengthNum.end_pageY = touch.$_changedTouches[0].clientY
      this.animation = bool
    },
    touchMoveFun(touch) {
      this.lengthNum.end_pageX = touch.$_changedTouches[0].clientX
      this.lengthNum.end_pageY = touch.$_changedTouches[0].clientY
    },
    changeTouchEndFun(touch, bool) {
      if (this.moveY === -120) {
        this.toHomeClick()
      }
      this.lengthNum.start_pageX = 0
      this.lengthNum.start_pageY = 0
      this.lengthNum.end_pageX = 0
      this.lengthNum.end_pageY = 0
      setTimeout(() => { this.animation = bool }, 0)
    },
    toHomeClick() {
      const wx = this.wx
      wx.reLaunch({
        url: `${PageUrl.index + PageUrl.data}/zh-CN/Home`
        // url: `${PageUrl.index + PageUrl.data}/zh-CN/Contact`
      })
    },
    emailClick(emailStr: any) {
      const showToast = this.showToast
      const wx = this.wx
      if (process.env.isMiniprogram) {
        wx.showModal({
          title: '',
          content: `邮箱：${emailStr}`,
          confirmText: '复制',
          confirmColor: '#2DDA93', // 主操作字体颜色
          cancelText: '取消',
          cancelColor: '#999', // 次要操作字体颜色
          success(res: { confirm: any; cancel: any }) {
            if (res.confirm) {
              // 用户点击了主要操作
              wx.setClipboardData({
                data: emailStr,
                success() {
                  // wx.showToast({
                  //   title: '复制成功'
                  // })
                  showToast({
                    title: '复制成功'
                  })
                }
              })
            } else if (res.cancel) {
              // 用户点击了次要操作
              // 用户返回默认点击次要操作
            }
          }
        })
      }
    },
    phoneClick(phoneTel: any) {
      const wx = this.wx
      if (process.env.isMiniprogram) {
        wx.showModal({
          title: '',
          content: `呼叫：${phoneTel}`,
          confirmText: '呼叫',
          confirmColor: '#2DDA93', // 主操作字体颜色
          cancelText: '取消',
          cancelColor: '#999', // 次要操作字体颜色
          success(res: { confirm: any; cancel: any }) {
            if (res.confirm) {
              // 用户点击了主要操作
              wx.makePhoneCall({
                phoneNumber: phoneTel,
                success() {
                  console.log('拨号成功')
                },
                // eslint-disable-next-line no-unused-vars
                fail(err: any) {
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
})
</script>
<style lang="less">
.Container.ContainerGuide{
  width: 100%;
  height: 100%;
  background-image: linear-gradient(var(--blue), var(--green));
  position: relative;
  .back_plate{
    position: absolute;
    width: 700rpx;
    height: 350rpx;
    left: 0px;
    top: 0px;
    background-image: linear-gradient(91.26deg, #61D2C4 14.8%, #29D890 81.49%);
    box-shadow: 0rpx 8rpx 40rpx rgba(51, 228, 155, 0.25);
    transform: rotate(-27.7deg);
    transform-origin: left top;
  }
  .header,
  .body,
  .footer{
    width: auto;
    height: auto;
  }
  .header{
    position: absolute;
    top: 33%;
    text-align: center;
    width: 100%;
    .logeTitle{
      text-align: center;
      line-height: 70rpx;
      font-weight: 600;
      font-size: 52rpx;
      color: #666666;
      padding: 0 80rpx;
      text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25);
    }
    .logoText{
      text-align: right;
      color: #fff;
      font-size: 30rpx;
      letter-spacing: 1rpx;
      padding: 25rpx 110rpx 0;
      box-sizing: border-box;
      color: #666666;
      text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25);
    }
  }
  .body{
    width: 520rpx;
    position: absolute;
    z-index: 2;
    left: 0;
    right: 0;
    margin: auto;
    bottom: 205rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left, .center, .right{
      .contactUsBtn, .enterBtn{
        width: 105rpx;
        height: 105rpx;
        box-sizing: border-box;
        border-radius: 50%;
        background-color: var(--green);
        box-shadow: 8rpx 8rpx 40rpx rgba(51, 228, 155, 0.3);
        .imgEmail, .imgTel, .imgEnterBtn{
          width: 100%;
          height: 100%;
        }
      }
    }
    .left{
      .contactUsBtn{
        padding: 24rpx;
      }
      .action{
        transform: scale( 0.95, 0.95);
      }
    }
    .center{
      .enterBtn{
        padding: 24rpx;
      }
    }
    .centerChange{
      animation: centerChange 3s infinite;
      animation-fill-mode: both; /* 不恢复原状 */
      animation-timing-function: ease-out;
      @keyframes centerChange{
        0% {
          transform: translate(0, 0);
        }
        4% {
          transform: translate(0, -45%);
        }
        8% {
          transform: translate(0, -60%);
        }
        12% {
          transform: translate(0, -45%);
        }
        16% {
          transform: translate(0, 0);
        }
        19.75% {
          transform: translate(0, -22.5%);
        }
        23.5% {
          transform: translate(0, -30%);
        }
        27.25% {
          transform: translate(0, -22.5%);
        }
        31% {
          transform: translate(0, 0);
        }
        100% {
          transform: translate(0, 0);
        }
      }
    }
    .right{
      .contactUsBtn{
        padding: 24rpx;
      }
      .action{
        transform: scale( 0.95, 0.95);
      }
    }
  }
  .footer{
    width: 375rpx;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 85rpx;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .pointChange{
      width: 18rpx;
      height: 18rpx;
      background-color: var(--green);
      border-radius: 50%;
      margin-top: 20rpx;
    }
    @keyframes pointChange{
      0% {
        opacity: 0.3;
      }
      10% {
        opacity: 1;
      }
      33.3333% {
        opacity: 0.3;
      }
      100% {
        opacity: 0.3;
      }
    }
    .change0{
      animation: pointChange 3s infinite;
      animation-fill-mode: both; /* 不恢复原状 */
      animation-timing-function: ease-out;
      animation-delay: 2s;
    }
    .change1{
      animation: pointChange 3s infinite;
      animation-fill-mode: both; /* 不恢复原状 */
      animation-timing-function: ease-out;
      animation-delay: 1s;
    }
    .change2{
      animation: pointChange 3s infinite;
      animation-fill-mode: both; /* 不恢复原状 */
      animation-timing-function: ease-out;
      animation-delay: 0s;
    }
  }
}
</style>
