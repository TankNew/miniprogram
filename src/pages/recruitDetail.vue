<template>
  <div class="Container ContainerRecruitDetail scrollbar" @click="unFunListViewFun()">
    <div class="userInfo" id="top">
      <UserInfo backText='人才招聘'></UserInfo>
    </div>
    <!-- <div class="headerRecruitDetail"
      v-if="RecruitId">
      <wx-image class="headerImg"
        :src="RecruitId.cover || '../../assets/images/guide_background.png'"
        mode="aspectFill"/>
    </div> -->
          <!-- open-type="contact"
          show-message-card="true"
          :session-from="'人才招聘'"
          :send-message-title="RecruitId.name" -->
    <div class="bodyRecruitDetail"
      v-if="RecruitId">
      <div class="head">
        <wx-image class="img"
          :src="RecruitId.icon || '../../assets/svgs/recruit/ui-design.svg'"
          mode="aspectFill"/>
        <div class="name ellipsis">{{RecruitId.name}}</div>
        <wx-button class="shop"
          hover-class="shopActive"
          hover-start-time="50"
          hover-stay-time="300"
          @click="toContactCustomerService()">咨询</wx-button>
      </div>
      <div class="body">
        <div class="item">
          <div class="name">工作性质:</div>
          <div class="value">{{marks[RecruitId.workNature]}}</div>
        </div>
        <div class="item">
          <div class="name">工作地点:</div>
          <div class="value">{{RecruitId.workLocation}}</div>
        </div>
        <div class="item">
          <div class="name">工作描述:</div>
          <div class="value" v-html="RecruitId.description"></div>
        </div>
        <div class="item">
          <div class="name">人数需求:</div>
          <div class="value">
            {{RecruitId.requireMembers == 0 ? '不限' : RecruitId.requireMembers + '人'}}
          </div>
        </div>
        <div class="item">
          <div class="name">经验需求:</div>
          <div class="value">
            {{RecruitId.requireWorkYears == 0 ? '不限' : RecruitId.requireWorkYears + '年'}}
          </div>
        </div>
        <div class="item">
          <div class="name">需求描述:</div>
          <div class="value" v-html="RecruitId.requireMent"></div>
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
import { mapState, mapGetters, mapActions } from 'vuex'
import UserInfo from '@/components/userInfo.vue'
import Tabbar from '@/components/tabbar.vue'

import PageUrl from '@/utiltools/pageUrl'

export default Vue.extend({
  name: 'RecruitDetail',
  components: {
    UserInfo,
    Tabbar
  },
  computed: {
    ...mapState([]),
    ...mapGetters({
      RecruitId: 'getRecruitId',
    }),
  },
  data() {
    return {
      id: false,
      marks: ['无', '全职', '兼职', '远程办公'],

      // img_num: 0,
    }
  },
  created() {
    // eslint-disable-next-line no-unused-vars
    window.addEventListener('wxload', async (query) => {
      this.setTitle('人才招聘')
      const route = this.$route
      if (route && route.params) {
        this.id = route.params.id || false
      }
    })
    window.addEventListener('wxshow', async () => {
      this.init()
    })
  },
  methods: {
    ...mapActions(['asyncRecruitId', 'setTitle']),
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
      await this.asyncRecruitId({
        id: this.id
      })
      if (!this.RecruitId) {
        error()
        return
      }
      this.setTitle(this.RecruitId.name)
    },
    // // 轮播图片切换
    // setImgNum(num) {
    //   this.img_num = (this.ShareNetId.imgList.length + num) % this.ShareNetId.imgList.length
    // },
    // // star
    // getViewFun(num) {
    //   return Math.floor(num)
    // },

    // // 数组转字符串
    // viewListFun(list) {
    //   return list.join('，')
    // },
    // 关闭tabbarFun
    unFunListViewFun() {
      this.$refs.tabbars.unFunListViewFun()
    },
  },
})
</script>
<style lang="less">
.Container.ContainerRecruitDetail{
  box-sizing: border-box;
  background-color: #FBFDFF;
  .userInfo{
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    margin-bottom: 0rpx;
  }
  .headerRecruitDetail{
    width: 100%;
    height: 435rpx;
    box-shadow: 0rpx 5rpx 45rpx #ddd;
    .headerImg{
      width: 100%;
      height: 100%;
    }
  }
  .bodyRecruitDetail{
    width: 100%;
    box-sizing: border-box;
    padding: 40rpx 50rpx 0;
    .head{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .img{
        width: 87rpx;
        height: 87rpx;
        background-color: rgba(200, 200, 200, .3);
        padding: 15rpx;
        box-sizing: border-box;
        border-radius: 20%;
      }
      .name{
        width: calc(100% - 235rpx);
        padding-left: 25rpx;
        box-sizing: border-box;
        padding: 0 25rpx;
        font-size: 35rpx;
        color: #000;
      }
      .shop{
        background-color: #0BCE83;
        border-radius: 8rpx;
        padding: 9rpx 45rpx;
        font-size: 28rpx;
        color: #fff;
        -webkit-tap-highlight-color: transparent;
      }
      .shopActive{
        background-color: #0BCE83aa;
      }
    }
    .body{
      padding-top: 10rpx;
      .item{
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding-top: 45rpx;
        .name{
          width: 22%;
          padding-left: 2%;
          color: #888;
          font-size: 28rpx;
        }
        .value{
          width: 76%;
          color: #000;
          font-size: 28rpx;
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
