<template>
  <div class="Container ContainerMiniApp" @click="unFunListViewFun()">
    <wx-scroll-view class="containerMiniApp"
      scroll-y="true"
      :scroll-top="scrollTop"
      scroll-with-animation="true">
      <div class="userInfo" id="top">
        <UserInfo :backText="MiniApp && MiniApp.items && MiniApp.items.length > 0 ?
          MiniApp.items[0].catalogGroup.displayName : ''"></UserInfo>
      </div>
      <div class="listMiniApp" v-if="MiniApp">
        <wx-view class="itemMiniApp"
          v-for="(item, index) in MiniApp.items"
          :key="index"
          hover-class="itemMiniAppAction"
          hover-start-time="50"
          hover-stay-time="200"
          @click="toShareNetDetailFun(item.id)">
          <div class="itemImg">
            <wx-image class="img" :src="item.cover"
              lazy-load="true" mode="aspectFill"/>
          </div>
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
            <div class="describe">
              <div class="name">描述</div>
              <div class="describeText ellipsis2"
                v-if="item.content"
                v-html="cutString(_filter(item.content), 200)"></div>
            </div>
          </div>
        </wx-view>
      </div>
    </wx-scroll-view>
    <div class="buttomMiniApp" @click="toTopFun()">
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
  name: 'MiniApp',
  components: {
    UserInfo,
    Tabbar
  },
  computed: {
    ...mapState(['MiniApp_id']),
    ...mapGetters({
      MiniApp: 'getMiniApp',
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
      this.setTitle('多彩小程序')
    })
    window.addEventListener('wxshow', async () => {
      await this.asyncMiniApp({
        IsActive: true,
        SkipCount: 0,
        MaxResultCount: 100,
        Sorting: 'IsTop DESC,Number ASC',
        catalogGroupId: this.MiniApp_id
      })
      this.init()
    })
  },
  methods: {
    ...mapActions(['setTitle', 'asyncMiniApp']),

    async init() {
      if (this.MiniApp && this.MiniApp.items && this.MiniApp.items.length > 0) {
        this.setTitle(this.MiniApp.items[0].catalogGroup.displayName)
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
          if (strlen >= len) {
            return `${s.substring(0, s.length - 1)}..`
          }
        } else {
          strlen += 1
          if (strlen >= len) {
            return `${s.substring(0, s.length - 2)}..`
          }
        }
      }
      return s
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
.Container.ContainerMiniApp{
  box-sizing: border-box;
  background-color: #FBFDFF;
  .containerMiniApp{
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
  .listMiniApp{
    width: 676rpx;
    margin: 0 auto;
    .itemMiniApp{
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 30rpx;
      .itemImg{
        width: 275rpx;
        height: 275rpx;
        border-radius: 4rpx;
        box-sizing: border-box;
        padding: 14rpx;
        box-shadow: 3rpx 9rpx 20rpx rgba(0, 0, 0, 0.1);
        .img{
          width: 100%;
          height: 100%;
          border-radius: 10rpx;
          // border: 1rpx solid rgba(0,0,0,0.1);
        }
      }
      .bodyTitle{
        width: 365rpx;
        box-sizing: border-box;
        padding-top: 5rpx;
        .title{
          max-width: 360rpx;
          font-weight: 700;
          font-size: 30rpx;
          color: #36455A;
        }
        .body{
          display: flex;
          justify-content: flex-start;
          padding-top: 20rpx;
          .item{
            // padding: 0rpx 28rpx;
            padding-right: 40rpx;
            .name{
              font-weight: 500;
              font-size: 24rpx;
              color: #A1A8B9;
            }
            .text{
              max-width: 220rpx;
              font-weight: 400;
              font-size: 24rpx;
              color: #495566;
              padding-top: 15rpx;
            }
            .text.price{
              color: var(--green);
            }
          }
          .item:last-child{
            padding-right: 0rpx;
          }
        }
        .describe{
          padding-top: 20rpx;
          .name{
            font-size: 24rpx;
            color: #A1A8B9;
          }
          .describeText{
            padding-top: 15rpx;
            font-size: 24rpx;
            line-height: 35rpx;
            text-indent: 1rem;
            color: #495566;
          }
        }
      }
    }
    .itemMiniAppAction{
      transform: scale( 0.98, 0.98);
    }
  }
  .buttomMiniApp{
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
