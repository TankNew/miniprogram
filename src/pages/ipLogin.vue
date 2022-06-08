<template>
  <div class="Container ContainerIpLogin scrollbar" id="Container" @click="unFunListViewFun()">
    <div class="userInfo" id="top">
      <UserInfo backText='域名注册'
        background="linear-gradient(107.16deg, #61D2C4 -9.45%, #48A2F5 85.23%);"></UserInfo>
    </div>
    <div class="chooseIpLogin">
      <div style="width: 100%;">
        <div class="chooseTitle">选择您喜欢的域名后缀</div>
        <div class="chooseListIp" v-if="IpLogin && IpLogin.items">
          <wx-swiper class="swiperIp"
            autoplay="false"
            display-multiple-items="1"
            interval="5000"
            duration="1000"
            :current="num"
            circular="true"
            previous-margin="180rpx"
            next-margin="180rpx"
            @change="changeNum($event)">
              <wx-swiper-item class="itemIp"
                v-for="(item, index) in IpLogin.items"
                :key="index">
                <div class="chooseItemIp"
                  @click="changeNumFun(index)"
                  :class="num === index ? 'chooseItemIpAction' : ''">
                  <div class="ellipsis">{{item.title}}</div>
                </div>
              </wx-swiper-item>
          </wx-swiper>
        </div>
        <div class="chooseListBody" v-if="IpLogin && IpLogin.items">
          <div class="itemItem"
            v-if="IpLogin.items[num]">
            <div class="title ellipsis">{{IpLogin.items[num].url}}</div>
            <div class="describe"
              v-if="IpLogin.items[num].hasInfo"
              v-html="IpLogin.items[num].info"></div>
          </div>
        </div>
      </div>
        <!-- open-type="contact"
        show-message-card="true"
        :session-from="'域名注册'"
        :send-message-title="'域名注册'" -->
      <wx-button class="shop"
        hover-class="shopActive"
        hover-start-time="50"
        hover-stay-time="300"
        @click="toContactCustomerService()">免费咨询</wx-button>
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

export default Vue.extend({
  name: 'IpLogin',
  components: {
    UserInfo,
    Tabbar
  },
  computed: {
    ...mapState([]),
    ...mapGetters({
      IpLogin: 'getIpLogin',
    }),
  },
  data() {
    return {
      num: 0,
      // IpLogin_idList: [139, 140, 141]
    }
  },
  created() {
    // eslint-disable-next-line no-unused-vars
    window.addEventListener('wxload', async (query) => {
      this.setTitle('域名注册')
    })
    window.addEventListener('wxshow', async () => {
      await this.asyncIpLogin({
        IsActive: true,
        SkipCount: 0,
        MaxResultCount: 100,
        Sorting: 'IsTop DESC,Number ASC'
      })
      this.init()
    })
  },
  methods: {
    ...mapActions(['setTitle', 'asyncIpLogin']),
    ...mapActions(['toContactCustomerService']),

    async init() {
      if (this.IpLogin && this.IpLogin.total && this.IpLogin.total >= 2) { this.num = 1 }
    },
    
    changeNum(el) {
      this.num = el.$_detail.current
    },
    // 修改选择域名
    changeNumFun(num) {
      this.num = num
    },
    // 关闭tabbarFun
    unFunListViewFun() {
      this.$refs.tabbars.unFunListViewFun()
    },
  },
})
</script>
<style lang="less">
.Container.ContainerIpLogin{
  box-sizing: border-box;
  background-color: #FBFDFF;
  .userInfo{
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    margin-bottom: 30rpx;
  }
  .chooseIpLogin{
    width: 676rpx;
    margin: 0 auto;
    background-color: white;
    border-radius: 20rpx;
    box-sizing: border-box;
    padding: 60rpx 0rpx;
    box-shadow: 0rpx 6rpx 30rpx rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 35rpx;

    min-height: calc(100% - 315rpx);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .chooseTitle{
      font-weight: 300;
      font-size: 30rpx;
      color: #000000;
      text-align: center;
    }
    .chooseListIp{
      width: 100%;
      height: 180rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      padding: 55rpx 50rpx 0;
      .swiperIp{
        width: 100%;
        height: 100%;
        // display: flex;
        // align-items: center;
        .itemIp{
          // height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          .chooseItemIp{
            width: 130rpx;
            height: 60rpx;
            line-height: 60rpx;
            text-align: center;
            font-weight: 400;
            font-size: 34rpx;
            color: #333333;
            opacity: 0.9;
            .ellipsis{
              width: 100%;
              box-sizing: border-box;
              padding: 0rpx;
            }
          }
          .chooseItemIpAction{
            width: 210rpx;
            height: 130rpx;
            font-size: 45rpx;
            color: white;
            border-radius: 20px;
            background-color: var(--blue);
            display: flex;
            justify-content: center;
            align-items: center;
            .ellipsis{
              width: 100%;
              box-sizing: border-box;
              padding: 0 20rpx;
            }
            animation: viewin162 0.3s 1;
            // animation-fill-mode: both; /* 不恢复原状 */
            animation-timing-function: ease-out;
          }
          @keyframes viewin162{
            0% {
              width: 130rpx;
              height: 60rpx;
            }
            100% {
              width: 210rpx;
              height: 130rpx;
            }
          }
        }
      }
    }
    .chooseListBody{
      width: 100%;
      padding-top: 75rpx;
      display: flex;
      flex-direction: column;
      // justify-content: center;
      align-items: center;
      .title{
        max-width: 80%;
        color: #333;
        font-weight: 600;
        font-size: 40rpx;
        text-align: center;
        margin-bottom: 40rpx;
      }
      .itemItem{
        display: flex;
        flex-direction: column;
        align-items: center;
        .describe{
          width: 100%;
          box-sizing: border-box;
          font-weight: 300;
          font-size: 29rpx;
          color: #3D3D3D;
          padding: 0rpx 60rpx 0;
        }
      }
    }
    .shop{
      border-radius: 15rpx;
      padding: 18rpx 38rpx;
      background-color: var(--blue);
      font-size: 24rpx;
      line-height: 30rpx;
      color: white;
      margin-top: 40rpx;
      -webkit-tap-highlight-color: transparent;
    }
    .shopActive{
      background-color: #48A2F5aa;
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
