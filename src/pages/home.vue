<template>
  <div class="Container ContainerHome scrollbar" @click="unFunListViewFun()">
    <div class="header">
      <div class="user">
        <div class="back_plate0"></div>
        <div class="back_plate1"></div>
        <div class="back_plate2">Home</div>
        <wx-block v-if="!(userInfo && userInfo.userInfo)" class="block">
          <div class="user_date" v-if="canIUseGetUserProfile">
            <div class="hello">欢迎您
              <!-- <div class="name">{{userInfo.userInfo.nickName}}</div> -->
            </div>
            <div class="date">{{date}}</div>
            <!-- <div class="login">点击授权</div> -->
          </div>
          <div v-else class="tips">
            <div>无法显示个人信息</div>
            <div>请使用2.10.4及以上版本基础库</div>
          </div>
          <div class="userinfo_avatar" v-if="canIUseGetUserProfile" @click="getUserProfile()">
            <wx-image class="ImgTouxiang"
              src="../../assets/svgs/login_touxiang.svg"
              mode="aspectFill" />
            <div class="login ellipsis">点击授权</div>
          </div>
        </wx-block>
        <wx-block v-else-if="userInfo && userInfo.userInfo" class="block">
          <div class="user_date">
            <div class="hello">欢迎您，
              <div class="name">{{userInfo.userInfo.nickName}}</div>
            </div>
            <div class="date">{{date}}</div>
          </div>
          <div class="userinfo_avatar">
            <wx-image class="ImgTouxiang" :src="userInfo.userInfo.avatarUrl" mode="aspectFill"/>
            <!-- <div class="name ellipsis">{{userInfo.userInfo.nickName}}</div> -->
          </div>
        </wx-block>
        <div class="input">
          <input id="search" class="search"
            v-model="inputSearchData"
            confirm-type="search"
            @confirm="inputSearchDataFun()"/>
          <div class="tips" v-if="inputSearchData.length === 0" @click="focusFun()">
            <wx-image class="searchImg" src="../../assets/svgs/home/search.svg" mode="aspectFit"/>
            <div class="placeholder">Search</div>
          </div>
        </div>
      </div>
    </div>
    <div class="funBody">
      <div class="item"
        :class="funNum === 0 ? 'action' : ''"
        @click="selectFunNumFun(0)">
        <wx-image class="funImg"
          :src="funNum === 0 ? funList[0].imgAction : funList[0].img"
          mode="aspectFit"/>
        <div class="text">{{funList[0].text}}</div>
      </div>
        <!-- open-type="contact"
        show-message-card="true"
        :session-from="'联系客服'" -->
      <wx-button class="item"
        :class="funNum === 1 ? 'action' : ''"
        hover-class="shopActive"
        hover-start-time="50"
        hover-stay-time="300"
        @click="selectFunNumFun(1);toContactCustomerService();">
        <wx-image class="funImg funImg_special"
          :src="funNum === 1 ? funList[1].imgAction : funList[1].img"
          mode="aspectFit"/>
        <div class="text">{{funList[1].text}}</div>
      </wx-button>
      <div class="item"
        :class="funNum === 2 ? 'action' : ''"
        @click="selectFunNumFun(2)">
        <wx-image class="funImg"
          :src="funNum === 2 ? funList[2].imgAction : funList[2].img"
          mode="aspectFit"/>
        <div class="text">{{funList[2].text}}</div>
      </div>
    </div>
    <div class="scrollbarBody" v-if="ShareNet && ShareNet.items && ShareNet.items.length > 0">
      <div class="title0">{{ShareNet.items[0].catalogGroup.displayName}}</div>
      <div class="body scrollbarY">
        <wx-view class="item0"
          v-for="(item, index) in ShareNet.items"
          :key="index"
          hover-class="action0"
          hover-start-time="50"
          hover-stay-time="200"
          @click="toRoutePushFun('/zh-CN/ShareNet', item.id)"
          :style="index ===  ShareNet.items.length - 1 ? 'margin-right: 37rpx;' : ''">
          <wx-image class="img" :src="item.cover"
            lazy-load="true" mode="aspectFill"/>
          <div class="text0">
            <div class="title">{{item.title}}</div>
            <!-- <div class="description ellipsis">会员免费</div> -->
            <div class="button ellipsis">会员免费</div>
          </div>
        </wx-view>
      </div>
    </div>
    <div><wx-official-account @load="asdFun" @error="asdFun"></wx-official-account></div>
    <div class="scrollbarBody" v-if="MiniApp && MiniApp.items && MiniApp.items.length > 0"
      style="margin-bottom: 0rpx;">
      <div class="title0">{{MiniApp.items[0].catalogGroup.displayName}}</div>
      <div class="body scrollbarY">
        <wx-view class="item1"
          v-for="(item, index) in MiniApp.items"
          :key="index"
          hover-class="action1"
          hover-start-time="50"
          hover-stay-time="200"
          @click="toRoutePushFun('/zh-CN/MiniApp', item.id)"
          :style="index ===  MiniApp.items.length - 1 ? 'margin-right: 37rpx;' : ''">
          <wx-image class="img" :src="item.cover"
            lazy-load="true" mode="aspectFill"/>
          <div class="text0">
            <div class="title ellipsis">#{{item.title}}</div>
          </div>
        </wx-view>
      </div>
    </div>
    <div class="scrollbarBody" v-if="IpLogin && IpLogin.items && IpLogin.items.length > 0"
      style="margin-bottom: 0rpx;">
      <div class="title0">{{'域名注册'}}</div>
      <div class="body scrollbarY">
        <wx-view class="item2"
          v-for="(item, index) in IpLogin.items"
          :key="index"
          hover-class="action2"
          hover-start-time="50"
          hover-stay-time="200"
          @click="toRoutePushNullFun('/zh-CN/IpLogin', item.id)"
          :style="index === 0 ?
            'margin-left: 37rpx;margin-right: 20rpx;' : (index ===  IpLogin.items.length - 1 ?
              'margin-right: 37rpx;' : 'margin-right: 20rpx;')">
          <!-- <wx-image class="img" :src="item.logo"
            lazy-load="true" mode="aspectFit"/> -->
          <div class="title">{{item.title}}</div>
          <div class="text0">
            <!-- <div class="title ellipsis"
              v-html="cutString(_filter(item.info), 15)">国内顶级域名</div> -->
            <!-- <div class="title ellipsis">国内顶级域名</div> -->
            <div class="title ellipsis">{{item.url}}</div>
          </div>
        </wx-view>
      </div>
    </div>
    <div class="func">
      <wx-view class="head" v-if="App && App.items"
        hover-class="func_head_action"
        hover-start-time="50"
        hover-stay-time="200"
        @click="toRoutePushNullFun('/zh-CN/App')">
        <wx-image class="img" :src="App.items[0].catalogGroup.cover"
          lazy-load="true" mode="aspectFill"/>
        <div class="displayName">
          <wx-image class="img" :src="'../../assets/svgs/home/app.svg'"
            lazy-load="true" mode="aspectFit"/>
          {{App.items[0].catalogGroup.displayName}}
        </div>
      </wx-view>
      <div class="body">
        <wx-view class="item" v-if="Host"
          hover-class="func_item_action"
          hover-start-time="50"
          hover-stay-time="200"
          @click="toRoutePushNullFun('/zh-CN/Host')">
          <wx-image class="img" :src="Host.cover"
            lazy-load="true" mode="aspectFill"/>
          <div class="displayName">
            <wx-image class="img" :src="'../../assets/svgs/home/host.svg'"
              lazy-load="true" mode="aspectFit"/>
            {{Host.displayName}}
          </div>
        </wx-view>
        <wx-view class="item" v-if="BusinessMail"
          hover-class="func_item_action"
          hover-start-time="50"
          hover-stay-time="200"
          @click="toRoutePushNullFun('/zh-CN/BusinessMail')">
          <wx-image class="img" :src="BusinessMail.cover"
            lazy-load="true" mode="aspectFill"/>
          <div class="displayName"
            style="background-color: rgba(189, 129, 194, 0.9);">
            <wx-image class="img" :src="'../../assets/svgs/home/businessMail.svg'"
              lazy-load="true" mode="aspectFit"/>
            {{BusinessMail.displayName}}
          </div>
        </wx-view>
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
import { mapState, mapGetters, mapActions } from 'vuex'
import Tabbar from '@/components/tabbar.vue'

import PageUrl from '@/utiltools/pageUrl'

export default Vue.extend({
  name: 'Home',
  components: {
    Tabbar
  },
  computed: { 
    ...mapState(['funNum', 'funList', 'ShareNet_id', 'MiniApp_id',
      'App_id', 'Host_id', 'BusinessMail_id']),
    ...mapGetters({
      userInfo: 'getUserInfo',
      ShareNet: 'getShareNet',
      MiniApp: 'getMiniApp',

      IpLogin: 'getIpLogin',
      App: 'getApp',
      Host: 'getHost',
      BusinessMail: 'getBusinessMail',
    }),
  },
  data() {
    return {
      inputSearchData: '',

      canIUseGetUserProfile: false,
      canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
      date: '',
    }
  },
  created() {
    // eslint-disable-next-line no-unused-vars
    window.addEventListener('wxload', async (query) => {
      this.setTitle('首页')
    })
    window.addEventListener('wxshow', async () => {
      this.asyncShareNet({
        IsActive: true,
        SkipCount: 0,
        MaxResultCount: 100,
        Sorting: 'IsTop DESC,Number ASC',
        catalogGroupId: this.ShareNet_id
      })
      this.asyncMiniApp({
        IsActive: true,
        SkipCount: 0,
        MaxResultCount: 100,
        Sorting: 'IsTop DESC,Number DESC',
        catalogGroupId: this.MiniApp_id
      })
      this.asyncIpLogin({
        IsActive: true,
        SkipCount: 0,
        MaxResultCount: 100,
        Sorting: 'IsTop DESC,Number ASC'
      })
      this.asyncAppList({
        IsActive: true,
        SkipCount: 0,
        MaxResultCount: 100,
        Sorting: 'IsTop DESC,Number ASC',
        catalogGroupId: this.App_id
      })
      this.asyncHost({
        id: this.Host_id
      })
      this.asyncBusinessMail({
        id: this.BusinessMail_id
      })
      this.init()
    })
  },
  methods: {
    ...mapActions(['setTitle', 'getUserProfile', 'asyncShareNet', 'asyncMiniApp',
      'asyncIpLogin', 'asyncAppList', 'asyncHost', 'asyncBusinessMail']),
    ...mapActions(['toContactCustomerService']),

    async init() {
      this.date = this.getTime(new Date())
      
      if (wx.getUserProfile) {
        this.canIUseGetUserProfile = true
      }
    },

    toRoutePushFun(url, id) {
      setTimeout(() => {
        wx.navigateTo({
          url: `${PageUrl.index + PageUrl.data + url}/${id}`
        })
      }, 300)
    },
    toRoutePushNullFun(url) {
      setTimeout(() => {
        wx.navigateTo({
          url: `${PageUrl.index + PageUrl.data + url}`
        })
      }, 300)
    },

    // 搜索框
    // 搜索
    inputSearchDataFun() {
      if (this.inputSearchData === '') return
      console.log(this.inputSearchData)
    },
    // 聚焦输入框
    focusFun() {
      document.getElementById('search').focus()
    },
    // 功能切换
    selectFunNumFun(num) {
      // if (this.funNum === num) {
      //   return
      // }
      this.$store.state.funNum = num
      if (num === 0) {
        setTimeout(() => {
          this.toRoutePushNullFun('/zh-CN/Recruit')
        }, 100)
      }
    },
    // 过滤html
    _filter(str) {
      if (str !== null && str !== '' && str !== undefined) {
        const regex = /(<([^>]+)>)/gi
        let res = str.replace(regex, '')
        res = res.replace(/&nbsp;/gi, '')
        return res
      }
      return null
    },
    // 截取字段
    cutString(str, len) {
      if (str == null || str === '' || str === undefined) return null
      // length属性读出来的汉字长度为1
      if (str.length * 2 <= len) {
        return str
      }
      let strlen = 0
      let s = ''
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < str.length; i++) {
        s += str.charAt(i)
        if (str.charCodeAt(i) > 128) {
          strlen += 2
          if (strlen > len) {
            return `${s.substring(0, s.length - 1)}`
          }
        } else {
          strlen += 1
          if (strlen > len) {
            return `${s.substring(0, s.length - 2)}`
          }
        }
      }
      return s
    },

    asdFun(e) {
      console.log('公众号信息：', e)
    },


    // 清除html标签
    // delHtml(str) {
    //   return str.replace(/<[^>]+>/g, '')
    //     .replace(/&ldquo;/g, '“').replace(/&rdquo;/g, '”')
    //     .replace(/&nbsp;/g, ' ')
    // },

    // 关闭tabbarFun
    unFunListViewFun() {
      this.$refs.tabbars.unFunListViewFun()
    },
    // 转格式 英文月份 日期,年份
    getTime(time) {
      const monthEng = ['January', 'February', 'March', 'April', 'May',
        'June', 'July', 'August', 'September', 'October', 'November', 'December']
      // const time = new Date()
      return `${monthEng[time.getMonth()]} ${
        (`00${time.getDate()}`).slice(-2)}, ${
        (`0000${time.getFullYear()}`).slice(-4)}`
    }
  },
})
</script>
<style lang="less">
.Container.ContainerHome{
  box-sizing: border-box;
  background-color: #FBFDFF;
  .header{
    width: 100%;
    height: auto;
    box-sizing: border-box;
    margin-bottom: 80rpx;
    .user{
      width: 100%;
      height: 258rpx;
      background: linear-gradient(107.16deg, #61D2C4 -9.45%, #29D890 85.23%);
      position: relative;
      .back_plate0, .back_plate1{
        border-radius: 50%;
        width: 408rpx;
        height: 408rpx;
        position: absolute;
        top: -258rpx;
        left: 414rpx;
        background: rgba(255, 255, 255, 0.15);
      }
      .back_plate1{
        width: 248rpx;
        height: 248rpx;
        top: 46rpx;
        left: 600rpx;
      }
      .back_plate2{
        position: absolute;
        bottom: 0rpx;
        right: -35rpx;
        font-weight: 900;
        font-size: 127rpx;
        line-height: 127rpx;
        color: rgba(255, 255, 255, 0.15);
      }
      .block{
        position: relative;
        top: 50%;
        transform: translate(0, -50%);
        width: 650rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        left: 0;
        right: 0;
        margin: 0 auto;
        .user_date{
          color: #fff;
          .hello{
            font-size: 38rpx;
            font-weight: 600;
            max-width: 530rpx;
            .name{
              white-space: nowrap;
              display: inline-block;
              max-width: 400rpx;
            }
          }
          .date{
            font-size: 27rpx;
            font-weight: 300;
            line-height: 55rpx;
          }
          .login{
            font-size: 36rpx;
          }
        }
        .userinfo_avatar{
          width: auto;
          height: auto;
          overflow: hidden;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          .ImgTouxiang{
            width: 94rpx;
            height: 94rpx;
            background-color: transparent;
            -webkit-tap-highlight-color: transparent;
            border-radius: 50%;
          }
          .name{
            padding-top: 10rpx;
            color: white;
            font-size: 30rpx;
            font-weight: 600;
            text-align: center;
            max-width: 200rpx;
          }
          .login{
            font-size: 30rpx;
            color: white;
            padding-top: 10rpx;
          }
        }
        .tips{
          color: #fff;
          font-size: 30rpx;
          line-height: 55rpx;
        }
      }
      .input{
        position: absolute;
        bottom: -50rpx;
        width: 100%;
        .search{
          width: 658rpx;
          height: 78rpx;
          background-color: white;
          border-radius: 2000rpx;
          margin: 0 46rpx;
          padding: 0 40rpx;
          box-sizing: border-box;
          font-size: 30rpx;
          color: var(--titleFont);
          box-shadow: 6rpx 10rpx 40rpx rgba(182, 182, 182, 0.15);
        }
        .tips{
          position: absolute;
          left: 85rpx;
          bottom: 50%;
          transform: translate(0, 42%);
          display: flex;
          justify-content: left;
          align-items: center;
          .searchImg{
            width: 30rpx;
            height: 30rpx;
          }
          .placeholder{
            font-weight: 400;
            font-size: 29rpx;
            color: #D2D2D2;
            padding-left: 20rpx;
          }
        }
      }
    }
  }
  .funBody{
    width: 676rpx;
    height: 154rpx;
    display: flex;
    justify-content: space-between;
    // align-items: flex-start;
    align-items: center;
    margin: 0 auto;
    margin-bottom: 35rpx;
    .item{
      width: 196rpx;
      height: 138rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: white;
      box-shadow: 0rpx 12rpx 38rpx rgba(141, 141, 141, 0.15);
      border-radius: 6rpx;
      -webkit-tap-highlight-color: transparent;
      .funImg{
        width: 42rpx;
        height: 42rpx;
      }
      .funImg_special{
        width: 55rpx;
        height: 55rpx;
      }
      .text{
        font-size: 24rpx;
        line-height: 24rpx;
        padding-top: 20rpx;
        color: var(--titleFont);
      }
    }
    .item.action{
      // width: 216rpx;
      // height: 152rpx;
      background-color: var(--green);
      box-shadow: 0rpx 6rpx 25rpx rgba(51, 228, 155, 0.7);
      animation: viewin216 0.3s 1;
      animation-fill-mode: both; /* 不恢复原状 */
      animation-timing-function: ease-out;
      .text{
        font-size: 25rpx;
        line-height: 25rpx;
        color: white;
      }
    }
    @keyframes viewin216{
      0% {
        width: 196rpx;
        height: 138rpx;
      }
      100% {
        width: 216rpx;
        height: 152rpx;
      }
    }
    .shopActive{
      background-color: #0BCE83aa;
    }
  }
  .scrollbarBody{
    .title0{
      width: 676rpx;
      margin: 0 auto;
      font-size: 32rpx;
      font-weight: 600;
      letter-spacing: 2rpx;
      color: var(--titleFont);
    }
    .body{
      position: relative;
      display: flex;
      justify-content: left;
      padding: 30rpx 0 35rpx;
      .item0, .item1{
        width: 598rpx;
        height: 325rpx;
        box-sizing: border-box;
        position: relative;
        display: inline-block;
        margin-left: 37rpx;
        border-radius: 10rpx;
        overflow: hidden;
        box-shadow: 5rpx 0rpx 15rpx rgba(100, 100, 100, 0.3);
        .img{
          width: 100%;
          height: 100%;
        }
        .text0{
          position: absolute;
          left: 25rpx;
          bottom: 25rpx;
          color: white;
          // text-shadow: 0px 0px 4rpx rgba(0, 0, 0, 0.35);
          .title{
            font-weight: 700;
            font-size: 36rpx;
            line-height: 54rpx;
          }
          .description{
            font-weight: 400;
            font-size: 24rpx;
            line-height: 36rpx;
            opacity: 0.85;
          }
          .button{
            background-color: #0bce83;
            border-radius: 8rpx;
            text-align: center;
            font-size: 24rpx;
            // font-weight: 400;
            color: #fff;
            display: inline-block;
            padding: 10rpx 28rpx;
            margin-top: 10rpx;
            // -webkit-tap-highlight-color: transparent;
          }
        }
      }
      .action0{
        transform: scale( 0.98, 0.98);
      }
      .item1{
        width: 250rpx;
        height: 270rpx;
        border-radius: 7rpx;
        box-shadow: 5rpx 0rpx 15rpx rgba(100, 100, 100, 0.3);
        .text0{
          left: 1rpx;
          bottom: 15rpx;
          text-shadow: none;
          background-color: rgba(255, 255, 255, 0.6);
          border-radius: 0px 3px 3px 0px;
          padding: 5rpx 22rpx;
          .title{
            color: rgba(46, 56, 47, 0.8);
            font-weight: 500;
            font-size: 20rpx;
            line-height: 30rpx;
            box-sizing: border-box;
            max-width: 190rpx;
          }
        }
      }
      .action1{
        transform: scale( 0.98, 0.98);
      }
      .item2{
        width: 215rpx;
        height: 190rpx;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        // margin-left: 37rpx;
        border-radius: 7rpx;
        box-shadow: 0rpx 0rpx 15rpx rgba(100, 100, 100, 0.1);
        .img{
          width: 80%;
          height: 35%;
          padding-bottom: 1%;
        }
        .title{
          font-size: 42rpx;
          padding-bottom: 1%;
          color: #6A6F7D;
          font-weight: 700;
        }
        .text0{
          left: 1rpx;
          bottom: 15rpx;
          text-shadow: none;
          background-color: rgba(255, 255, 255, 0.6);
          border-radius: 0px 3px 3px 0px;
          padding: 5rpx 22rpx;
          .title{
            // color: rgba(46, 56, 47, 0.8);
            color: #6A6F7D;
            font-weight: 500;
            font-size: 25rpx;
            line-height: 30rpx;
            box-sizing: border-box;
            max-width: 180rpx;
          }
        }
      }
      .action2{
        transform: scale( 0.98, 0.98);
      }
    }
  }
  .func{
    .head{
      position: relative;
      margin: 0 37rpx 30rpx;
      height: 275rpx;
      .img{
        width: 100%;
        height: 100%;
      }
      .displayName{
        position: absolute;
        bottom: 40rpx;
        background-color: rgba(249, 152, 152, 0.9);
        display: flex;
        align-items: center;
        padding: 15rpx 35rpx;
        border-radius: 0rpx 10rpx 10rpx 0rpx;
        color: white;
        font-size: 32rpx;
        font-weight: 400;
        .img{
          width: 55rpx;
          height: 55rpx;
          padding-right: 15rpx;
        }
      }
    }
    .func_head_action{
      transform: scale( 0.98, 0.98);
    }
    .body{
      margin: 0 37rpx 30rpx;
      display: flex;
      justify-content: space-between;
      .h5-wx-component.wx-view{
        width: 48%;
      }
      .item{
        position: relative;
        height: 275rpx;
        .img{
          width: 100%;
          height: 100%;
        }
        .displayName{
          position: absolute;
          bottom: 40rpx;
          background-color: rgba(169, 183, 157, 0.9);
          display: flex;
          align-items: center;
          padding: 18rpx 22rpx;
          border-radius: 0rpx 10rpx 10rpx 0rpx;
          color: white;
          font-size: 30rpx;
          font-weight: 400;
          .img{
            width: 45rpx;
            height: 45rpx;
            padding-right: 15rpx;
          }
        }
      }
      .func_item_action{
        transform: scale( 0.98, 0.98);
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
