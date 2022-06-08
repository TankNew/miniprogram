<template>
  <div class="Container ContainerShareNet" @click="unFunListViewFun()">
    <wx-scroll-view class="containerShareNet"
      scroll-y="true"
      :scroll-top="scrollTop"
      scroll-with-animation="true">
      <div class="userInfo" id="top">
        <UserInfo :backText="ShareNet && ShareNet.items && ShareNet.items.length > 0 ?
          ShareNet.items[0].catalogGroup.displayName : ''"></UserInfo>
      </div>
      <div class="listShareNet" v-if="ShareNet">
        <wx-view class="itemShareNet"
          v-for="(item, index) in ShareNet.items"
          :key="index"
          hover-class="itemShareNetAction"
          hover-start-time="50"
          hover-stay-time="200"
          @click="toShareNetDetailFun(item.id)">
          <wx-image class="itemImg" :src="item.cover"
            lazy-load="true" mode="aspectFill"/>
          <div class="bodyTitle">
            <div class="title ellipsis">{{item.title}}</div>
            <div class="body">
              <div class="item">
                <div class="name">行业建议</div>
                <div class="text ellipsis">{{viewListFun(item.tags)}}</div>
              </div>
              <div class="item">
                <div class="name">售价</div>
                <div class="text price">{{'会员免费'}}</div>
              </div>
            </div>
          </div>
        </wx-view>
      </div>
    </wx-scroll-view>
    <div class="buttomShareNet" @click="toTopFun()">
      <wx-image class="downImg" src="../../assets/svgs/shareNet/down.svg"/>
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

import PageUrl from '@/utiltools/pageUrl'

export default Vue.extend({
  name: 'ShareNet',
  components: {
    UserInfo,
    Tabbar
  },
  computed: {
    ...mapState(['ShareNet_id']),
    ...mapGetters({
      ShareNet: 'getShareNet',
    }),
  },
  data() {
    return {
      scrollTop: 0,
    }
  },
  created() {
    // eslint-disable-next-line no-unused-vars
    window.addEventListener('wxload', async (query) => {
      this.setTitle('共享建站')
    })
    window.addEventListener('wxshow', async () => {
      await this.asyncShareNet({
        IsActive: true,
        SkipCount: 0,
        MaxResultCount: 100,
        Sorting: 'IsTop DESC,Number ASC',
        catalogGroupId: this.ShareNet_id
      })
      this.init()
    })
  },
  methods: {
    ...mapActions(['setTitle', 'asyncShareNet']),

    async init() {
      // 4152
      if (this.ShareNet && this.ShareNet.items && this.ShareNet.items.length > 0) {
        this.setTitle(this.ShareNet.items[0].catalogGroup.displayName)
      }
    },
    
    // 跳转到详情
    toShareNetDetailFun(id) {
      setTimeout(() => {
        wx.navigateTo({
          url: `${PageUrl.index + PageUrl.data + this.$route.path}/${id}`
        })
      }, 300)
    },
    // 返回网页顶部
    toTopFun() {
      this.scrollTop = 1
      setTimeout(() => {
        this.scrollTop = 0
      }, 0)
    },
    // 数组转字符串
    viewListFun(list) {
      return list.join('，')
    },
    // 关闭tabbarFun
    unFunListViewFun() {
      this.$refs.tabbars.unFunListViewFun()
    },
  },
})
</script>
<style lang="less">
.Container.ContainerShareNet{
  box-sizing: border-box;
  background-color: #FBFDFF;
  .containerShareNet{
    width: 100%;
    height: 100%;
  }
  .userInfo{
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    margin-bottom: 30rpx;
  }
  .listShareNet{
    width: 676rpx;
    margin: 0 auto;
    .itemShareNet{
      border-radius: 20rpx;
      box-sizing: border-box;
      // border: 1rpx solid rgba(0,0,0,0.3);
      margin-bottom: 30rpx;
      // box-shadow: 0px 0px 80rpx rgba(0, 0, 0, 0.1);
      box-shadow: 0rpx 5rpx 10rpx rgba(0, 0, 0, 0.1);
      .itemImg{
        width: 100%;
        height: 290rpx;
        border-radius: 20rpx 20rpx 0rpx 0rpx;
      }
      .bodyTitle{
        .title{
          max-width: 550rpx;
          box-sizing: border-box;
          padding-top: 20rpx;
          padding-left: 25rpx;
          font-weight: 700;
          font-size: 30rpx;
          color: #36455A;
        }
        .body{
          display: flex;
          justify-content: flex-start;
          padding-top: 25rpx;
          padding-bottom: 20rpx;
          .item{
            padding: 0rpx 28rpx;
            .name{
              font-weight: 500;
              font-size: 24rpx;
              color: #A1A8B9;
            }
            .text{
              max-width: 400rpx;
              font-weight: 400;
              font-size: 24rpx;
              color: #495566;
              padding-top: 15rpx;
            }
            .text.price{
              color: var(--green);
            }
          }
        }
      }
    }
    .itemShareNetAction{
      transform: scale( 0.98, 0.98);
    }
  }
  .buttomShareNet{
    width: 90rpx;
    height: 90rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    right: 25rpx;
    bottom: 155rpx;
    background-color: rgba(45, 218, 147, 0.5);
    box-shadow: 8rpx 8rpx 40rpx rgba(51, 228, 155, 0.3);
    border-radius: 50%;
    .downImg{
      width: 50rpx;
      height: 50rpx;
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
