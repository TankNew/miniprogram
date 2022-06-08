<template>
  <div class="Container ContainerHost scrollbar" id="Container" @click="unFunListViewFun()">
    <div class="userInfo" id="top">
      <UserInfo backText='虚拟主机'
        background="linear-gradient(107.16deg, #61D2C4 -9.45%, #48A2F5 85.23%);"></UserInfo>
    </div>
    <div class="fictitiousHost"
      v-if="Host">
      <div v-if="Host && Host.content"
        v-html="Host.content"></div>
      <div class="buttomHost">
          <!-- open-type="contact"
          show-message-card="true"
          :session-from="'虚拟主机'"
          :send-message-title="'虚拟主机'" -->
        <wx-button class="shop"
          hover-class="shopActive"
          hover-start-time="50"
          hover-stay-time="300"
          @click="toContactCustomerService()">免费咨询</wx-button>
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

export default Vue.extend({
  name: 'Host',
  components: {
    UserInfo,
    Tabbar
  },
  computed: {
    ...mapState(['Host_id']),
    ...mapGetters({
      Host: 'getHost',
    }),
  },
  data() {
    return {
    }
  },
  created() {
    // eslint-disable-next-line no-unused-vars
    window.addEventListener('wxload', async (query) => {
      this.setTitle('虚拟主机')
    })
    window.addEventListener('wxshow', async () => {
      await this.asyncHost({
        id: this.Host_id
      })
      this.init()
    })
  },
  methods: {
    ...mapActions(['setTitle', 'asyncHost']),
    ...mapActions(['toContactCustomerService']),

    async init() {
      // i
    },
    
    // 关闭tabbarFun
    unFunListViewFun() {
      this.$refs.tabbars.unFunListViewFun()
    },
  },
})
</script>
<style lang="less">
.Container.ContainerHost{
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
  .fictitiousHost{
    width: 676rpx;
    margin: 0 auto;
    background-color: white;
    border-radius: 20rpx;
    box-sizing: border-box;
    padding: 50rpx 0rpx;
    box-shadow: 0rpx 6rpx 30rpx rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin-bottom: 35rpx;

    min-height: calc(100% - 315rpx);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .buttomHost{
      width: 100%;
      padding-top: 45rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      .shop{
        border-radius: 15rpx;
        padding: 18rpx 38rpx;
        background-color: var(--blue);
        font-size: 24rpx;
        line-height: 30rpx;
        color: white;
        -webkit-tap-highlight-color: transparent;
      }
      .shopActive{
        background-color: #48A2F5aa;
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
