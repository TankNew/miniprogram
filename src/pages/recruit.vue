<template>
  <div class="Container ContainerRecruit scrollbar" id="Container" @click="unFunListViewFun()">
    <div class="userInfo" id="top">
      <UserInfo backText='人才招聘'></UserInfo>
    </div>
    <div class="Recruit scrollbarY"
      v-if="Recruit && Recruit.items">
      <wx-view class="item"
        v-for="(item, index) in Recruit.items"
        :key="index"
        hover-class="recruit_action"
        hover-start-time="50"
        hover-stay-time="200"
        @click="toRecruitDetailFun(item.id)"
        :style="(index ===  Recruit.items.length - 1 ? 'margin-right: 37rpx;' : '') +
          (index % 2 === 0 ? 'background-color: #B4B7BF;' : 'background-color: #CFC5BA;')">
        <wx-image class="back_img"
          v-if="item.cover"
          :src="item.cover"
          lazy-load="true" mode="aspectFill"/>
        <wx-image class="titleImg"
          v-if="item.icon"
          :src="item.icon || '../../assets/svgs/recruit/ui-design.svg'"
          lazy-load="true" mode="aspectFill"/>
        <div class="text">
          <div class="title ellipsis">{{item.name}}</div>
          <div class="num_people">
            {{item.requireMembers == 0 ? '不限' : item.requireMembers + '人'}}
          </div>
        </div>
      </wx-view>
    </div>
    <div class="RecruitBody"
      v-if="Recruit">
      <div class="title ellipsis">岗位需求清单</div>
      <div class="body"
        v-if="Recruit.items">
        <wx-view class="item"
          v-for="(item, index) in Recruit.items"
          :key="index"
          hover-class="recruitBody_action"
          hover-start-time="50"
          hover-stay-time="200"
          @click="toRecruitDetailFun(item.id)">
          <wx-image class="titleImg"
            :src="item.icon || '../../assets/svgs/recruit/ui-design.svg'"
            lazy-load="true" mode="aspectFill"/>
          <div class="center">
            <div class="title ellipsis">{{item.name}}</div>
            <div class="type ellipsis">{{marks[item.workNature]}}</div>
          </div>
          <div class="right">
            <div class="num_people">
              {{item.requireMembers == 0 ? '不限' : item.requireMembers + '人'}}
            </div>
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
import UserInfo from '@/components/userInfo.vue'
import Tabbar from '@/components/tabbar.vue'

import PageUrl from '@/utiltools/pageUrl'

export default Vue.extend({
  name: 'Recruit',
  components: {
    UserInfo,
    Tabbar
  },
  computed: {
    ...mapState([]),
    ...mapGetters({
      Recruit: 'getRecruit',
    }),
  },
  data() {
    return {
      // num: 0,
      marks: ['无', '全职', '兼职', '远程办公'],
    }
  },
  created() {
    // eslint-disable-next-line no-unused-vars
    window.addEventListener('wxload', async (query) => {
      this.setTitle('招聘')
    })
    window.addEventListener('wxshow', async () => {
      await this.asyncRecruit()
      this.init()
    })
  },
  methods: {
    ...mapActions(['setTitle', 'asyncRecruit']),

    async init() {
      // if (this.ipLogin.total >= 2) this.num = 1
    },
    // 跳转到详情
    toRecruitDetailFun(id) {
      setTimeout(() => {
        wx.navigateTo({
          url: `${PageUrl.index + PageUrl.data + this.$route.path}/${id}`
        })
      }, 300)
    },
    // 关闭tabbarFun
    unFunListViewFun() {
      this.$refs.tabbars.unFunListViewFun()
    },
  },
})
</script>
<style lang="less">
.Container.ContainerRecruit{
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
  .Recruit{
    width: 100%;
    display: flex;
    padding: 30rpx 0;
    .item{
      width: 450rpx;
      height: 450rpx;
      overflow: hidden;
      border-radius: 25rpx;
      position: relative;
      margin-left: 37rpx;
      box-shadow: 5rpx 8rpx 15rpx rgba(100, 100, 100, 0.3);
      // .back_img{
      //   width: 100%;
      //   height: 100%;
      //   position: absolute;
      //   top: 0rpx;
      //   left: 0rpx;
      // }
      .titleImg{
        width: 87rpx;
        height: 87rpx;
        position: absolute;
        top: 12%;
        left: 10%;
        box-sizing: border-box;
        border-radius: 20%;
        background-color: transparent;
      }
      .text{
        position: absolute;
        bottom: 12%;
        left: 10%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        .title{
          max-width: 350rpx;
          font-weight: 700;
          font-size: 35rpx;
          line-height: 35rpx;
          color: white;
          text-shadow: 0rpx 2rpx 6rpx rgba(0, 0, 0, 0.5);
        }
        .num_people{
          font-weight: 400;
          font-size: 28rpx;
          line-height: 28rpx;
          color: #000000;
          background-color: white;
          border-radius: 15rpx;
          padding: 15rpx 17rpx;
          margin-top: 30rpx;
          box-shadow: 0rpx 0rpx 10rpx rgba(0, 0, 0, 0.2);
        }
      }
    }
    .recruit_action{
      transform: scale( 0.98, 0.98);
    }
  }
  .RecruitBody{
    width: 676rpx;
    margin: 0 auto;
    margin-top: 35rpx;
    .title{
      width: 100%;
      font-weight: 400;
      font-size: 30rpx;
      line-height: 40rpx;
      color: #06070D;
    }
    .body{
      padding-top: 40rpx;
      .item{
        height: 150rpx;
        box-sizing: border-box;
        padding: 30rpx 40rpx;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        position: relative;
        .titleImg{
          width: 87rpx;
          height: 87rpx;
          box-sizing: border-box;
          border-radius: 20%;
          background-color: transparent;
        }
        .center{
          width: 70%;
          box-sizing: border-box;
          padding-left: 35rpx;
          .title{
            width: 100%;
            font-weight: 400;
            font-size: 30rpx;
            line-height: 48rpx;
            color: #0A0909;
          }
          .type{
            width: 100%;
            font-weight: 400;
            font-size: 24rpx;
            line-height: 25px;
            display: flex;
            align-items: center;
            color: #06070D;
            opacity: 0.3;
          }
        }
        .right{
          position: absolute;
          right: 40rpx;
          top: 50%;
          transform: translate(0, -50%);
          .num_people{
            box-sizing: border-box;
            padding: 15rpx 17rpx;
            border-radius: 15rpx;
            font-size: 28rpx;
            line-height: 28rpx;
            background-color: #F6F6F6;
            box-shadow: 0rpx 0rpx 8rpx rgba(0, 0, 0, 0.1);
          }
        }
      }
      .recruitBody_action{
        transform: scale( 0.95, 0.95);
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
