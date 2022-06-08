<template>
  <div class="Container ContainerMiniAppDetail scrollbar" @click="unFunListViewFun()">
    <wx-scroll-view class="containerMiniAppDetail"
      scroll-y="true"
      :scroll-top="scrollTop"
      scroll-with-animation="true">
      <div class="headerMiniAppDetail"
        v-if="MiniAppId">
        <wx-swiper class="swiperMiniAppDetail"
          autoplay="true"
          display-multiple-items="1"
          interval="5000"
          duration="1000"
          :current="img_num"
          circular="true">
            <wx-swiper-item class="itemMiniAppDetail"
              v-for="(item, index) in MiniAppId.pictureWithInfos"
              :key="index">
              <div class="itemImg">
                <wx-image class="Img" :src="item.picUrl" mode="aspectFill"/>
              </div>
            </wx-swiper-item>
        </wx-swiper>
        <wx-view class="left"
          hover-class="leftrightAction"
          hover-start-time="50"
          hover-stay-time="200"
          @click="setImgNum(img_num - 1)">
          <wx-image class="Img" src="../../assets/svgs/shareNet/left.svg"/>
        </wx-view>
        <wx-view class="right"
          hover-class="leftrightAction"
          hover-start-time="50"
          hover-stay-time="200"
          @click="setImgNum(img_num + 1)">
          <wx-image class="Img" src="../../assets/svgs/shareNet/right.svg"/>
        </wx-view>
      </div>
      <div class="labelMiniAppDetail"
        v-if="MiniAppId">
        <div class="item"
          v-for="(item, index) in MiniAppId.tags"
          :key="index">
          <div class="text">{{item}}</div>
        </div>
      </div>
          <!-- open-type="contact"
          show-message-card="true"
          :session-from="'小程序'"
          :send-message-title="MiniAppId.title"
          :send-message-img="MiniAppId.cover" -->
      <div class="titleMiniAppDetail"
        v-if="MiniAppId">
        <div class="title ellipsis">{{MiniAppId.title}}</div>
        <wx-button class="price"
          hover-class="priceActive"
          hover-start-time="50"
          hover-stay-time="300"
          @click="toContactCustomerService()">{{'免费'}}</wx-button>
      </div>
      <div class="starsMiniAppDetail"
        v-if="MiniAppId">
        <div class="item"
          v-for="(item, index) in getViewFun(MiniAppId.star)"
          :key="index">
          <wx-image class="Img"
            @click="submitMiniAppIdVoteStarFun(index + 1)"
            src="../../assets/svgs/shareNet/star-action.svg"/>
        </div>
        <div class="item"
          v-for="(item, index) in (5 - getViewFun(MiniAppId.star))"
          :key="index">
          <wx-image class="Img"
            @click="submitMiniAppIdVoteStarFun(index + 1 + getViewFun(MiniAppId.star))"
            src="../../assets/svgs/shareNet/star-grey.svg"/>
        </div>
        <div class="text">{{MiniAppId.star}}</div>
      </div>
      <div class="bodyMiniAppDetail"
        v-if="MiniAppId">
        <div class="item">
          <div class="name">行业建议</div>
          <div class="text ellipsis">{{viewListFun(MiniAppId.tags)}}</div>
        </div>
        <div class="item">
          <div class="name">售价</div>
          <div class="text price">{{'会员免费'}}</div>
        </div>
      </div>
      <div class="describeMiniAppDetail"
        v-if="MiniAppId">
        <div class="text">描述</div>
        <div class="describe"
          v-if="MiniAppId.content"
          v-html="MiniAppId.content"></div>
      </div>
    </wx-scroll-view>
    <div class="buttomMiniAppDetail" @click="toTopFun()">
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
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import Tabbar from '@/components/tabbar.vue'

import PageUrl from '@/utiltools/pageUrl'

export default Vue.extend({
  name: 'MiniAppDetail',
  components: {
    Tabbar
  },
  computed: {
    ...mapState([]),
    ...mapGetters({
      MiniAppId: 'getMiniAppId',
      userInfo: 'getUserInfo'
    }),
  },
  data() {
    return {
      id: false,

      img_num: 0,

      scrollTop: 0,
    }
  },
  created() {
    // eslint-disable-next-line no-unused-vars
    window.addEventListener('wxload', async (query) => {
      this.setTitle('小程序模板')
      const route = this.$route
      if (route && route.params) {
        this.id = route.params.id || false
      }
      this.setMiniAppId('')
    })
    window.addEventListener('wxshow', async () => {
      this.init()
    })
  },
  methods: {
    ...mapMutations(['setUserInfo', 'setMiniAppId']),
    ...mapActions(['asyncMiniAppId', 'asyncMiniAppIdVoteStar', 'getUserProfile', 'setTitle']),
    ...mapActions(['toContactCustomerService']),

    async init() {
      const error = () => {
        wx.showModal({
          title: '',
          content: '路径错误',
          confirmText: '确定',
          confirmColor: '#2DDA93', // 主操作字体颜色
          cancelText: '取消',
          cancelColor: '#999', // 次要操作字体颜色
          success() {
            wx.reLaunch({
              url: `${PageUrl.index + PageUrl.data}/zh-CN/Home`
            })
          }
        })
      }
      if (this.id === false) {
        error()
        return
      }
      await this.asyncMiniAppId({
        id: this.id
      })
      if (!this.MiniAppId) {
        error()
        return
      }

      this.setTitle(this.MiniAppId.title)
    },


    // 轮播图片切换
    setImgNum(num) {
      this.img_num = (this.MiniAppId.pictureWithInfos.length + num) %
        this.MiniAppId.pictureWithInfos.length
    },
    // star
    getViewFun(num) {
      return Math.floor(num)
    },
    // 返回网页顶部
    toTopFun() {
      this.scrollTop = 1
      setTimeout(() => {
        this.scrollTop = 0
      }, 0)
    },

    async submitMiniAppIdVoteStarFun(numStar) {
      const that = this
      if (that.userInfo && that.userInfo.guidID) {
        wx.showModal({
          title: '',
          content: `确定评价 ${numStar} 星`,
          confirmText: '确认',
          confirmColor: '#2DDA93', // 主操作字体颜色
          cancelText: '取消',
          cancelColor: '#999', // 次要操作字体颜色
          success(res) {
            if (res.confirm) {
              // 用户点击了主要操作
              that.asyncMiniAppIdVoteStar({
                catalogItemId: that.MiniAppId.id,
                voteId: that.userInfo.guidID,
                star: numStar
              })
            } else if (res.cancel) {
              // 用户点击了次要操作
              // 用户返回默认点击次要操作
            }
          }
        })
      } else {
        wx.showModal({
          title: '请先授权',
          content: '需要授权才能评价，确认授权？',
          confirmText: '确认',
          confirmColor: '#2DDA93', // 主操作字体颜色
          cancelText: '取消',
          cancelColor: '#999', // 次要操作字体颜色
          // eslint-disable-next-line no-unused-vars
          success(res) {
            if (res.confirm) {
              // 用户点击了主要操作
              that.setUserInfo('')
              that.getUserProfile()
            } else if (res.cancel) {
              // 用户点击了次要操作
              // 用户返回默认点击次要操作
            }
          }
        })
      }
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
.Container.ContainerMiniAppDetail{
  box-sizing: border-box;
  background-color: #FBFDFF;
  .containerMiniAppDetail{
    width: 100%;
    height: 100%;
  }
  .headerMiniAppDetail{
    width: 100%;
    height: 840rpx;
    position: relative;
    background-color: #50D4B5;
    margin-bottom: 30rpx;
    .swiperMiniAppDetail{
      height: 100%;
      .itemMiniAppDetail{
        box-sizing: border-box;
        padding: 55rpx 125rpx;
        .itemImg{
          width: 100%;
          height: 100%;
          border-radius: 15rpx;
          box-sizing: border-box;
          border: 2rpx solid white;
          filter: drop-shadow(0rpx 6rpx 30rpx rgba(0, 0, 0, 0.25));
          .Img{
            width: 100%;
            height: 100%;
            border-radius: 15rpx;
          }
        }
      }
    }
    .left, .right{
      width: 35rpx;
      height: 65rpx;
      position: absolute;
      top: 50%;
      left: 35rpx;
      transform: translate(0, -50%);
      .Img{
        width: 100%;
        height: 100%;
        filter: drop-shadow(0rpx 0rpx 5rpx rgba(0, 0, 0, 1));
      }
    }
    .right{
      left: unset;
      right: 35rpx;
    }
    .leftrightAction{
      transform: scale( 0.94, 0.94) translate(0, -50%);
    }
  }
  .labelMiniAppDetail{
    width: 676rpx;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin: 0 auto;
    .item{
      background-color: rgba(47, 145, 235, 0.1);
      padding: 15rpx 45rpx;
      border-radius: 6rpx;
      margin-right: 20rpx;
      margin-bottom: 20rpx;
      .text{
        font-size: 24rpx;
        font-weight: 700;
        color: #2F91EB;
      }
    }
    .item:last-child{
      margin-right: 0rpx;
    }
  }
  .titleMiniAppDetail{
    width: 676rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto 24rpx;
    .title{
      max-width: 510rpx;
      font-size: 40rpx;
      font-weight: 700;
      color: #36455A;
    }
    .price{
      background-color: #0BCE83;
      border-radius: 8rpx;
      padding: 9rpx 45rpx;
      font-size: 28rpx;
      color: #fff;
      -webkit-tap-highlight-color: transparent;
    }
    .priceActive{
      background-color: #0BCE83aa;
    }
  }
  .starsMiniAppDetail{
    width: 676rpx;
    display: flex;
    justify-content: left;
    align-items: center;
    margin: 0 auto 45rpx;
    .item{
      .Img{
        width: 28rpx;
        height: 28rpx;
        padding-right: 10rpx;
      }
    }
    .text{
      font-size: 25rpx;
      padding-left: 15rpx;
    }
  }
  .bodyMiniAppDetail{
    width: 676rpx;
    display: flex;
    justify-content: flex-start;
    margin: 0 auto 45rpx;
    .item{
      padding-right: 45rpx;
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
  .describeMiniAppDetail{
    width: 676rpx;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin: 0 auto;
    .text{
      font-weight: 300;
      font-size: 28rpx;
      color: #495566;
    }
    .describe{
      font-weight: 400;
      font-size: 28rpx;
      text-indent: 0em;
      line-height: 40rpx;
      color: #6A6F7D;
      padding-top: 15rpx;
    }
  }
  .buttomMiniAppDetail{
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
