<template>
  <div class="tabbars">
    <wx-image class="background_image"
      src="../../assets/images/menu-background.png"
      mode="scaleToFill"/>
    <div class="tabbars_plate_left"></div>
    <wx-view class="tabbarItem tabbarHome"
      :class="this.$route.path === '/zh-CN/Home' ? 'tabbarAction' : ''"
      @click="toRouteFun('/zh-CN/Home')"
      hover-class="tabbarItemHomeAction"
      hover-start-time="50"
      hover-stay-time="200">
      <wx-image :src="this.$route.path === '/zh-CN/Home' ? tabbar.home.imgAction : tabbar.home.img"
        class="tabbarImg"/>
      <div class="tabbarName">{{tabbar.home.text}}</div>
    </wx-view>
    <div class="tabbarbody">
      <wx-view class="add_fun_list"
        @click.stop="changeFunListViewFun()"
        hover-class="tabbarBodyAction"
        hover-start-time="50"
        hover-stay-time="200">
        <div class="itemBody">
          <wx-image class="add_img"
            src="../../assets/svgs/add-white.svg"
            mode="scaleToFill"/>
        </div>
      </wx-view>
    </div>
    <div class="fun_list_body"
      v-if="funListView">
      <div class="left">
        <div class="body leftBody"
          v-if="tabbar_fun_list.left">
          <wx-view class="fun_item"
            :class="'fun_item' + index"
            v-for="(item, index) in tabbar_fun_list.left"
            :key="index"
            @click.stop="toRouteFun(item.route)"
            hover-class="fun_itemAction"
            hover-start-time="50"
            hover-stay-time="200">
            <wx-image class="fun_item_img"
              :src="item.img"
              :style="'background-color: ' + item.color + ';'"
              v-if="item.img"/>
            <div class="fun_item_name ellipsis"
              :class="item.route === route.path ? 'fun_item_nameAction' : ''"
              v-if="item.img">{{item.text}}</div>
          </wx-view>
        </div>
      </div>
      <div class="center">
        <div class="body"
          v-if="tabbar_fun_list.center">
          <wx-view class="fun_item"
            v-for="(item, index) in tabbar_fun_list.center"
            :key="index"
            @click.stop="toRouteFun(item.route)"
            hover-class="fun_itemAction"
            hover-start-time="50"
            hover-stay-time="200">
            <wx-image class="fun_item_img"
              :src="item.img"
              :style="'background-color: ' + item.color + ';'"
              v-if="item.img"/>
            <div class="fun_item_name ellipsis"
              :class="item.route === route.path ? 'fun_item_nameAction' : ''"
              v-if="item.img">{{item.text}}</div>
          </wx-view>
        </div>
      </div>
      <div class="right">
        <div class="body rightBody"
          v-if="tabbar_fun_list.right">
          <wx-view class="fun_item"
            :class="'fun_item' + index"
            v-for="(item, index) in tabbar_fun_list.right"
            :key="index"
            @click.stop="toRouteFun(item.route)"
            hover-class="fun_itemAction"
            hover-start-time="50"
            hover-stay-time="200">
            <wx-image class="fun_item_img"
              :src="item.img"
              :style="'background-color: ' + item.color + ';'"
              v-if="item.img"/>
            <div class="fun_item_name ellipsis"
              :class="item.route === route.path ? 'fun_item_nameAction' : ''"
              v-if="item.img">{{item.text}}</div>
          </wx-view>
        </div>
      </div>
    </div>
    <wx-view class="tabbarItem tabbarPersonal"
      :class="this.$route.path === '/zh-CN/Personal' ? 'tabbarAction' : ''"
      @click="toRouteFun('/zh-CN/Personal')"
      hover-class="tabbarItemPersAction"
      hover-start-time="50"
      hover-stay-time="200">
      <wx-image :src="this.$route.path === '/zh-CN/Personal' ?
        tabbar.personal.imgAction : tabbar.personal.img"
        class="tabbarImg"/>
      <div class="tabbarName">{{tabbar.personal.text}}</div>
    </wx-view>
    <div class="tabbars_plate_right"></div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

import PageUrl from '@/utiltools/pageUrl'

export default {
  name: 'Tabbar',
  computed: {
    ...mapState(['tabbar', 'tabbar_fun_list']),
  },
  data() {
    return {
      funListView: false,
      route: {},

    }
  },
  created() {
    window.addEventListener('wxshow', async () => {
      this.route = this.$route
    })
  },
  mounted() {
    // console.log(this.$route)
  },
  methods: {
    ...mapActions(['']),
    toRouteFun(url) {
      if (this.$route.path !== url) {
        setTimeout(() => {
          // window.open(url)
          // this.$router.push(url)
          // window.location.href(url)
          if (url === '/zh-CN/WechatPublicNum') {
            return
          }
          wx.reLaunch({
            url: `${PageUrl.index + PageUrl.data + url}`
          })
        }, 300)
      }
    },
    // 控制功能列表显示
    changeFunListViewFun(bool) {
      if (typeof (bool) === 'boolean') {
        this.funListView = bool
        return
      }
      this.funListView = !this.funListView
    },
    unFunListViewFun() {
      if (this.funListView === false) return
      this.funListView = false
    }
  },
}
</script>
<style lang="less">
.h5-div.tabbars {
  width: 100%;
  height: 125rpx;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  border-radius: 2000rpx;
  filter: drop-shadow(0px -5px 22px rgba(0, 0, 0, 0.08));
  .tabbarItem{
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 135rpx;
    right: unset;
    bottom: unset;
    min-width: 120rpx;
    padding: 15rpx 0rpx;
    transform: translate( -50%, -50%);
    .tabbarImg{
      height: 45rpx;
      width: 45rpx;
    }
    .tabbarName{
      color: #D2D2D2;
      font-weight: 500;
      font-size: 22rpx;
      line-height: 30rpx;
      padding-top: 10rpx;
    }
  }
  .tabbarPersonal{
    left: unset;
    right: 135rpx;
    bottom: unset;
    transform: translate( 50%, -50%);
  }
  .tabbarItem.tabbarAction{
    .tabbarName{
      color: var(--green);
    }
  }
  .tabbarItemHomeAction{
    transform: translate( -50%, -50%) scale( 0.9, 0.9);
  }
  .tabbarItemPersAction{
    transform: translate( 50%, -50%) scale( 0.9, 0.9);
  }

  .tabbarbody{
    width: 500rpx;
    height: 100%;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    .add_fun_list{
      width: 90rpx;
      height: 90rpx;
      padding: 15rpx;
      border-radius: 50%;
      transform: translate( 0, -50%);
      position: absolute;
      top: 15rpx;
      left: 0;
      right: 0;
      margin: auto;
      .itemBody{
        width: 100%;
        height: 100%;
        background-color: var(--blue);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        .add_img{
          width: 30rpx;
          height: 30rpx;
        }
      }
    }
    .tabbarBodyAction{
      transform: translate( 0, -50%) scale( 0.95, 0.95);
    }
  }

  .fun_list_body{
    width: 750rpx;
    height: 750rpx;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.3);
    box-shadow: 0px 4px 15px rgba(97, 210, 196, 0.5);
    position: absolute;
    top: -375rpx;
    left: 0;
    right: 0;
    margin: auto;
    z-index: -1;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    .left, .center, .right{
      width: 33%;
      height: 48%;
      position: relative;
      box-sizing: border-box;
      .body{
        width: 100%;
        height: 100%;
        position: relative;
        .fun_item{
          width: 50%;
          height: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .fun_item_img{
            width: 62%;
            height: 62%;
            padding: 10%;
            border-radius: 25%;
            box-sizing: border-box;
          }
          .fun_item_name{
            width: auto;
            height: auto;
            padding-top: 6%;
            font-size: 23rpx;
            color: white;
            max-width: 100%;
          }
          .fun_item_nameAction{
            color: var(--green);
          }
        }
        .fun_itemAction{
          transform: scale( 0.95, 0.95);
        }
      }
    }
    .left, .right{
      padding-top: 15%;
      .body{
        .fun_item{
          position: absolute;
        }
      }
    }
    .left{
      .body{
        .fun_item.fun_item0{
          right: 8%;
          bottom: 55%;
        }
        .fun_item.fun_item1{
          right: 40%;
          bottom: 0%;
        }
      }
    }
    .right{
      .body{
        .fun_item.fun_item0{
          left: 8%;
          bottom: 55%;
        }
        .fun_item.fun_item1{
          left: 40%;
          bottom: 0%;
        }
      }
    }
    .center{
      width: 37%;
      height: 52%;
      padding: 3% 0 9%;
      .body{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        // align-items: center;
        align-content: space-between;
        flex-wrap: wrap;
        position: relative;
        .h5-wx-component.wx-view{
          width: 46%;
          height: 43%;
          .fun_item{
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    animation: tabbar_fun_list .1s 1;
    animation-timing-function: ease-out;
  }
  @keyframes tabbar_fun_list{
    0% {
      width: 0rpx;
      height: 0rpx;
      top: -0rpx;
    }
    100% {
      width: 750rpx;
      height: 750rpx;
      top: -375rpx;
    }
  }


  .background_image{
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 170rpx;
  }
  .tabbars_plate_left, .tabbars_plate_right{
    width: 100rpx;
    height: 100%;
    background: white;
  }
}
</style>
