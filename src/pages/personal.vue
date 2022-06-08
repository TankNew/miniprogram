<template>
  <div class="Container ContainerPersonal scrollbar" @click="unFunListViewFun()">
    <div class="headerPersonal">
      <div class="user">
        <div class="back_plate0"></div>
        <div class="back_plate1"></div>
        <wx-block v-if="!(userInfo && userInfo.userInfo)" class="block">
          <div class="userinfo_avatar" v-if="canIUseGetUserProfile" @click="getUserProfile()">
            <wx-image class="ImgTouxiang"
              src="../../assets/svgs/login_touxiang.svg"
              mode="aspectFill" />
          </div>
          <div class="user_Info" v-if="canIUseGetUserProfile" @click="getUserProfile()">
            <div class="login">点击授权</div>
          </div>
          <div v-else class="tips">
            <div>无法显示个人信息</div>
            <div>请使用2.10.4及以上版本基础库</div>
          </div>
        </wx-block>
        <wx-block v-else-if="userInfo && userInfo.userInfo" class="block">
          <div class="userinfo_avatar">
            <wx-image class="ImgTouxiang" :src="userInfo.userInfo.avatarUrl" mode="aspectFill"/>
          </div>
          <div class="user_Info">
            <div class="hello">
              <div class="name ellipsis">{{userInfo.userInfo.nickName}}</div>
            </div>
          </div>
        </wx-block>
        <div class="address" @click="toContactFun()">
          <wx-image class="addressImg"
            src="../../assets/svgs/address.svg"/>
          <div class="addressText ellipsis">{{CompanyInfo.appAddress}}</div>
        </div>
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
    </div>
    <div class="funBodyPersonal">
      <div class="item"
        :class="funNum === 0 ? 'action' : ''"
        @click="selectFunNumFun(0)">
        <div class="text">帮助文档</div>
      </div>
      <div class="item"
        :class="funNum === 1 ? 'action' : ''"
        @click="selectFunNumFun(1)">
        <div class="text">业务清单</div>
      </div>
      <div class="item"
        :class="funNum === 2 ? 'action' : ''"
        @click="selectFunNumFun(2)">
        <div class="text">在线客服</div>
      </div>
    </div>
    <div class="bodyPersonal">
      <div class="head">
        <div class="title">{{personal_fun[1].title}}</div>
        <div class="total">
          <wx-image class="totalImg" src="../../assets/svgs/personal/point.svg"/>
          {{personal_fun[1].total}}
        </div>
        <div class="date">{{getTimeEngFun(personal_fun[1].date)}}</div>
      </div>
      <div class="body">
        <div class="lef">
          <wx-view class="wechatbody"
            hover-class="itemAction"
            hover-start-time="50"
            hover-stay-time="200"
            @click="toRouteFun(personal_fun[1].wechat.route)"
            :style="'background-color: ' + personal_fun[1].wechat.color + ';'">
            <div class="item">
              <wx-image class="itemImg" :src="personal_fun[1].wechat.img" mode="aspectFit"/>
              <div class="name">{{personal_fun[1].wechat.text}}</div>
            </div>
            <div class="buttom">我的多彩小程序</div>
          </wx-view>
        </div>
        <div class="rig">
          <wx-view class="shareNet"
            hover-class="itemAction"
            hover-start-time="50"
            hover-stay-time="200"
            @click="toRouteFun(personal_fun[1].shareNet.route)"
            :style="'background-color: ' + personal_fun[1].shareNet.color + ';'">
            <div class="item">
              <wx-image class="itemImg" :src="personal_fun[1].shareNet.img" mode="aspectFit"/>
              <div class="name">
                {{personal_fun[1].shareNet.text}}
                <wx-image class="rightImg"
                  src="../../assets/svgs/personal/right.svg"
                  mode="aspectFit"/>
              </div>
            </div>
          </wx-view>
          <wx-view class="app"
            hover-class="itemAction"
            hover-start-time="50"
            hover-stay-time="200"
            @click="toRouteFun(personal_fun[1].app.route)"
            :style="'background-color: ' + personal_fun[1].app.color + ';'">
            <div class="item">
              <wx-image class="itemImg" :src="personal_fun[1].app.img" mode="aspectFit"/>
              <div class="name">
                {{personal_fun[1].app.text}}
                <wx-image class="rightImg"
                  src="../../assets/svgs/personal/right.svg"
                  mode="aspectFit"/>
              </div>
            </div>
          </wx-view>
        </div>
      </div>
    </div>
    <div class="bottom">
      <Tabbar ref="tabbars"></Tabbar>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-trailing-spaces */
import Vue from 'vue'
import { mapState, mapActions, mapGetters } from 'vuex'
import Tabbar from '@/components/tabbar.vue'

import PageUrl from '@/utiltools/pageUrl'

export default Vue.extend({
  name: 'Personal',
  components: {
    Tabbar
  },
  computed: {
    ...mapState(['personal_fun']),
    ...mapGetters(['wx']),
    ...mapGetters({
      userInfo: 'getUserInfo',
      CompanyInfo: 'getCompanyInfo',
    }),
  },
  data() {
    return {
      address: '',
      funNum: 1,

      canIUseGetUserProfile: false,
      canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'),
    }
  },
  created() {
    // eslint-disable-next-line no-unused-vars
    window.addEventListener('wxload', async (query) => {
      this.setTitle('用户中心')
    })
    window.addEventListener('wxshow', async () => {
      await this.asyncGetCompanyInfo()
      this.init()
    })
  },
  methods: {
    ...mapActions(['setTitle', 'asyncGetCompanyInfo', 'getUserProfile']),
    ...mapActions(['toContactCustomerService']),

    async init() {
      if (wx.getUserProfile) {
        this.canIUseGetUserProfile = true
      }
    },

    
    toRouteFun(url) {
      // if (this.$route.path !== url) {
      setTimeout(() => {
        // window.open(url)
        // this.$router.push(url)
        // window.location.href(url)
        wx.navigateTo({
          url: `${PageUrl.index + PageUrl.data + url}`
        })
      }, 300)
      // }
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
    },

    // 去联系
    toContactFun() {
      setTimeout(() => {
        wx.navigateTo({
          url: `${PageUrl.index + PageUrl.data}/zh-CN/Contact`
        })
      }, 300)
    },

    // 功能切换
    selectFunNumFun(num) {
      if (this.funNum === num) {
        return
      }
      this.funNum = num
    },
    
    // 转格式 英文月份 日期,年份
    getTimeEngFun(timeStr) {
      if (isNaN(timeStr) && !isNaN(Date.parse(timeStr))) {
        return this.getTime(new Date(timeStr))
      } 
      return '--- --,----'
    },
    getTime(time) {
      const monthEng = ['January', 'February', 'March', 'April', 'May',
        'June', 'July', 'August', 'September', 'October', 'November', 'December']
      // const time = new Date()
      return `${monthEng[time.getMonth()]} ${
        (`00${time.getDate()}`).slice(-2)}, ${
        (`0000${time.getFullYear()}`).slice(-4)}`
    },
    // 关闭tabbarFun
    unFunListViewFun() {
      this.$refs.tabbars.unFunListViewFun()
    },
  },
})
</script>
<style lang="less">
.Container.ContainerPersonal{
  box-sizing: border-box;
  background-color: #FBFDFF;
  .headerPersonal{
    width: 100%;
    height: auto;
    box-sizing: border-box;
    margin-bottom: 50rpx;
    .user{
      width: 100%;
      height: 364rpx;
      background: linear-gradient(107.16deg, #61D2C4 -9.45%, #29D890 85.23%);
      position: relative;
      overflow: hidden;
      .back_plate0, .back_plate1{
        border-radius: 50%;
        width: 586rpx;
        height: 586rpx;
        position: absolute;
        top: -293rpx;
        left: 170rpx;
        background: rgba(255, 255, 255, 0.15);
      }
      .back_plate1{
        width: 358rpx;
        height: 358rpx;
        top: unset;
        bottom: -160rpx;
        left: unset;
        right: -80rpx;
      }
      .block{
        position: relative;
        top: 35rpx;
        width: 650rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        left: 0;
        right: 0;
        margin: 0 auto;
        .userinfo_avatar{
          width: 158rpx;
          height: 158rpx;
          border-radius: 50%;
          overflow: hidden;
          box-sizing: border-box;
          .ImgTouxiang{
            width: 100%;
            height: 100%;
            // background-color: #eee;
            background-color: transparent;
            -webkit-tap-highlight-color: transparent;
            border-radius: 50%;
          }
        }
        .user_Info{
          color: #fff;
          .hello{
            padding-top: 20rpx;
            font-size: 43rpx;
            font-weight: 600;
            text-align: center;
            .name{
              white-space: nowrap;
              display: inline-block;
              max-width: 400rpx;
            }
          }
          .login{
            padding-top: 20rpx;
            font-size: 36rpx;
          }
        }
        .tips{
          text-align: center;
          color: #fff;
          font-size: 30rpx;
          line-height: 55rpx;
        }
      }
      .address{
        margin: auto;
        padding-top: 5rpx;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 20rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        .addressImg{
          width: 30rpx;
          height: 30rpx;
          padding: 8rpx;
        }
        .addressText{
          max-width: 250rpx;
          font-size: 26rpx;
          text-align: center;
          color: white;
        }
      }
      .contact{
        width: 165rpx;
        position: absolute;
        right: 20rpx;
        bottom: 15rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .contactItem{
          width: 73rpx;
          height: 73rpx;
          background-color: rgba(255, 255, 255, 0.75);
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
  }
  .funBodyPersonal{
    width: 620rpx;
    height: 75rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    margin-bottom: 35rpx;
    .item{
      width: 140rpx;
      height: 60rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      .text{
        font-size: 30rpx;
        line-height: 55rpx;
        font-weight: 400;
        color: var(--grey);
      }
    }
    .item.action{
      width: 225rpx;
      height: 70rpx;
      border-radius: 2000rpx;
      background-color: var(--blue);
      animation: viewin225 0.3s 1;
      // animation-fill-mode: both; /* 不恢复原状 */
      animation-timing-function: ease-out;
      .text{
        font-size: 30rpx;
        line-height: 55rpx;
        font-weight: 500;
        color: white;
      }
    }
    @keyframes viewin225{
      0% {
        width: 140rpx;
        height: 60rpx;
      }
      100% {
        width: 225rpx;
        height: 70rpx;
      }
    }
  }
  .bodyPersonal{
    width: 620rpx;
    margin: 0 auto;
    .head{
      margin-bottom: 25rpx;
      .title{
        font-size: 30rpx;
        font-weight: 600;
        color: #666;
      }
      .total{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-top: 15rpx;
        font-size: 28rpx;
        font-weight: 100;
        color: #36455A;
        .totalImg{
          width: 30rpx;
          height: 30rpx;
          padding-right: 20rpx;
        }
      }
      .date{
        font-size: 24rpx;
        font-weight: 500;
        color: #A1A8B9;
        padding-top: 10rpx;
      }
    }
    .body{
      height: 620rpx;
      display: flex;
      justify-content: space-between;
      background-color: white;
      box-shadow: 8rpx 8rpx 34rpx rgba(126, 126, 126, 0.1);
      border-radius: 6rpx;
      box-sizing: border-box;
      padding: 20rpx;
      .lef, .rig{
        width: calc(50% - 10rpx);
        height: 100%;
        .itemAction{
          transform: scale( 0.98, 0.98);
        }
        .item{
          width: auto;
          height: auto;
          position: absolute;
          top: 16%;
          left: 50%;
          transform: translate( -50%, 0);
          display: flex;
          flex-direction: column;
          align-items: center;
          .itemImg{
            width: 85rpx;
            height: 120rpx;
          }
          .name{
            display: flex;
            align-items: center;
            text-align: center;
            font-size: 30rpx;
            color: white;
            white-space: nowrap;
            padding-top: 20rpx;
            .rightImg{
              width: 35rpx;
              height: 35rpx;
              padding-left: 15rpx;
            }
          }
        }
        .wx-view{
          width: 100%;
          height: 100%;
        }
      }
      .lef{
        .wechatbody{
          width: 100%;
          height: 100%;
          position: relative;
          border-radius: 20rpx;
          // .item{
          //   top: 60rpx;
          // }
          .item {
            .itemImg{
              width: 95rpx;
            }
          }
          .buttom{
            width: 100%;
            max-width: 170rpx;
            border-radius: 2000rpx;
            position: absolute;
            bottom: 18%;
            left: 50%;
            transform: translate( -50%, 0);
            padding: 10rpx;
            font-size: 22rpx;
            font-weight: 400;
            text-align: center;
            white-space: nowrap;
            color: #666;
            background-color: white;
            box-shadow: 0rpx 4rpx 20rpx rgba(0, 0, 0, 0.25);
          }
        }
      }
      .rig{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .shareNet, .app{
          width: 100%;
          height: calc(100% - 10rpx);
          position: relative;
          border-radius: 20rpx;
        }
      }
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
