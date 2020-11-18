<template>
  <view class="header" :style="{ 'background':background,'padding-top':navBar.top+'px','height':navBar.height+'px','line-height':navBar.height+'px'}">
    <view class="left" :style="{color:color}" v-if="backBtn||title" @click="back">
      <uni-icons type="arrowleft" size="14" :color="color"></uni-icons>
      <view class="title">{{title}}</view>
    </view>
    <view class="flex1">
      <slot></slot>
    </view>
  </view>
</template>

<script>
  import uniIcons from "@/components/uni-icons/uni-icons.vue"

  export default {
    name: 'NavBar',
    components: {uniIcons},
    data() {
      return {
        navBar:{
          top:0,
          height:0
        }
      };
    },
    props: {
      background: {
        type:String,
        default: '#fff'
      },
      color: {
        type:String,
        default: '#333'
      },
      title: {
        type:String,
        default: ''
      },
      backBtn: {
        type:Boolean,
        default: true
      }
    },
    mounted(){
      //#ifdef APP-PLUS
      this.navBar.top = uni.getSystemInfoSync()['statusBarHeight'];
      this.navBar.height = 40;
      // #endif
      //#ifdef MP
      this.navBar = uni.getMenuButtonBoundingClientRect()
      // #endif

    },
    methods: {
      back:function () {
        uni.navigateBack({
          delta: 1
        });
      }
    }
  }
</script>
<style lang="scss">
  .header{
    padding-right: 190upx;
    padding-top: var(--status-bar-height);
    padding-bottom: 16upx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    .left{
      display: flex;
      align-items: center;
      padding: 0 40upx;
      .title{
        margin-left: 20upx;
      }
    }
  }
  .flex1{
    flex: 1;
  }
</style>
