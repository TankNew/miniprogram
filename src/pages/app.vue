<template>
  <div class="Container scrollbar" id="Container" @click="unFunListViewFun()">
    <div class="userInfo" id="top">
      <UserInfo :backText="App && App.items && App.items.length > 0 ?
          App.items[0].catalogGroup.displayName : ''"></UserInfo>
    </div>
    <div class="AppDevelopment"
      v-if="App">
      <wx-swiper class="swiperApp"
        autoplay="true"
        display-multiple-items="1"
        interval="5000"
        duration="1000"
        circular="true"
        indicator-dots="true"
        indicator-color="#DBDBDB"
        indicator-active-color="#2DDA93"
        v-if="App.items">
          <wx-swiper-item class="itemApp"
            v-for="(item, index) in App.items"
            :key="index">
            <wx-image class="appImg" :src="item.cover" mode="aspectFill"/>
            <div class="title ellipsis" v-if="item.title">{{item.title}}</div>
            <div class="characteristic" v-if="item.content"
              v-html="item.content"></div>
          </wx-swiper-item>
      </wx-swiper>
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
  name: 'App',
  components: {
    UserInfo,
    Tabbar
  },
  computed: {
    ...mapState(['App_id']),
    ...mapGetters({
      App: 'getApp'
    }),
  },
  data() {
    return {
      // num: 0,
    }
  },
  created() {
    // eslint-disable-next-line no-unused-vars
    window.addEventListener('wxload', async (query) => {
      this.setTitle('App开发')
    })
    window.addEventListener('wxshow', async () => {
      await this.asyncAppList({
        IsActive: true,
        SkipCount: 0,
        MaxResultCount: 100,
        Sorting: 'IsTop DESC,Number ASC',
        catalogGroupId: this.App_id
      })
      this.init()
    })
  },
  methods: {
    ...mapActions(['setTitle', 'asyncAppList']),

    async init() {
      if (this.App && this.App.items && this.App.items.length > 0) {
        this.setTitle(this.App.items[0].catalogGroup.displayName)
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
.Container{
  box-sizing: border-box;
  background-color: #FBFDFF;
  .userInfo{
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    margin-bottom: 50rpx;
  }
  .AppDevelopment{
    width: 676rpx;
    margin: 0 auto;
    .swiperApp{
      height: 880rpx;
      .itemApp{
        display: flex;
        flex-direction: column;
        align-items: center;
        .appImg{
          width: 420rpx;
          height: 420rpx;
          border-radius: 15rpx;
          box-shadow: 0px 0px 7px #61D2C4;
          margin-top: 55rpx;
        }
        .title{
          max-width: 600rpx;
          font-weight: 700;
          font-size: 35rpx;
          color: #36455A;
          padding-top: 90rpx;
        }
        .characteristic{
          width: 100%;
          font-weight: 400;
          font-size: 25rpx;
          text-indent: 0em;
          color: #6A6F7D;
          box-sizing: border-box;
          opacity: 0.8;
          padding: 50rpx 20rpx 0;
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
