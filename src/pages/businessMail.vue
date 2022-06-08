<template>
  <div class="Container ContainerBusinessMail scrollbar" id="Container" @click="unFunListViewFun()">
    <div class="userInfo" id="top">
      <UserInfo backText='企业邮箱'
        background="linear-gradient(107.16deg, #61D2C4 -9.45%, #48A2F5 85.23%);"></UserInfo>
    </div>
    <div class="mailBusinessMail">
      <div v-if="BusinessMail && BusinessMail.content"
        v-html="BusinessMail.content"></div>
      <div class="mailListBody">
          <!-- open-type="contact"
          show-message-card="true"
          :session-from="'企业邮箱'"
          :send-message-title="'企业邮箱'" -->
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
  name: 'BusinessMail',
  components: {
    UserInfo,
    Tabbar
  },
  computed: {
    ...mapState(['BusinessMail_id']),
    ...mapGetters({
      BusinessMail: 'getBusinessMail'
    }),
  },
  data() {
    return {
    }
  },
  created() {
    // eslint-disable-next-line no-unused-vars
    window.addEventListener('wxload', async (query) => {
      this.setTitle('企业邮箱')
    })
    window.addEventListener('wxshow', async () => {
      await this.asyncBusinessMail({
        id: this.BusinessMail_id
      })
      this.init()
    })
  },
  methods: {
    ...mapActions(['setTitle', 'asyncBusinessMail']),
    ...mapActions(['toContactCustomerService']),

    async init() {
      // if (this.ipLogin.total >= 2) this.num = 1
    },
    // 关闭tabbarFun
    unFunListViewFun() {
      this.$refs.tabbars.unFunListViewFun()
    },
  },
})
</script>
<style lang="less">
.Container.ContainerBusinessMail{
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
  .mailBusinessMail{
    width: 676rpx;
    min-height: calc(100% - 315rpx);
    margin: 0 auto;
    background-color: white;
    border-radius: 20rpx;
    box-sizing: border-box;
    padding: 60rpx 0rpx;
    box-shadow: 0rpx 6rpx 30rpx rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin-bottom: 35rpx;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .mailListBody{
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 30rpx;
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
