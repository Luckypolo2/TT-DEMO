<template>
<div class="home-container">
<!--  导航栏-->
  <van-nav-bar class="page-nav-bar" fixed>
    <van-button slot="title" type="info" size="small"
                round icon="search" class="search-btn" to="/search">搜索</van-button>
  </van-nav-bar>
<!--  TAB-->
  <van-tabs v-model="active" animated swipeable class="channel-tabs">
    <van-tab :title="channel.name"
             v-for="channel in channels"
             :key="channel.id">
      <article-list :channel="channel"/>
    </van-tab>
    <div slot="nav-right" class="placeholder"></div>
    <div slot="nav-right" class="hamburger-btn" @click="isPopupShow = true">
      <i class="toutiao toutiao-gengduo"></i>
    </div>
  </van-tabs>
<!--  TAB弹出层-->
  <van-popup
    v-model="isPopupShow"
    closeable
    position="bottom"
    :style="{ height: '100%' }"
    close-icon-position="top-left"
  >
    <channel-edit :my-channels="channels" :active="active" @update-active="onUpdateActive"></channel-edit>
  </van-popup>
</div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from '@/views/Home/components/article-list'
import ChannelEdit from '@/views/Home/components/channel-edit'
import { getItem } from '@/utils/storage'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    ArticleList,
    ChannelEdit
  },
  data () {
    return {
      active: 0,
      isPopupShow: false,
      channels: []
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async loadChannels () {
      try {
        // const { data: res } = await getUserChannels()
        // this.channels = res.data.channels
        let channel = []
        if (this.user) {
          // 已登录
          const { data: res } = await getUserChannels()
          channel = res.data.channels
        } else {
          // 未登录
          const localChannel = getItem('TOUTIAO_CHANNELS')
          if (localChannel) {
            // 有本地存储
            channel = localChannel
          } else {
            // 无本地存储，调用默认列表
            const { data: res } = await getUserChannels()
            channel = res.data.channels
          }
        }
        this.channels = channel
      } catch (error) {
        this.$toast('请求数据失败')
      }
    },
    onUpdateActive (index, isPopupShow = true) {
      this.active = index
      this.isPopupShow = isPopupShow
    }
  },
  created () {
    this.loadChannels()
  }
}
</script>

<style scoped lang="less">
.home-container{
  padding-top: 174px;
  padding-bottom: 100px;
  /deep/.van-nav-bar__title{
    max-width: unset;
  }
  /deep/.van-icon{
    font-size: 32px;
  }
  .search-btn{
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
  }
  /deep/.van-tabs__wrap{
    height: 82px;
    position: fixed;
    top: 92px;
    z-index: 1;
    left: 0;
    right: 0;
  }
  /deep/.van-tab--active{
    color: #333!important;
  }
  /deep/.van-tabs__line{
    width: 31px;
    height: 6px;
    background-color: #3296fa;
  }
  /deep/.van-tabs__nav{
    padding-bottom: 20px;
  }
  .channel-tabs{
    /deep/.van-tab{
      border-right: 1px solid #ebeff3;
      min-width: 200px;
      color: #777;
    }
    .placeholder{
      width: 66px;
      height: 82px;
      flex-shrink: 0;
    }
    .hamburger-btn{
      position: fixed;
      right: 0;
      width: 66px;
      height: 82px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #ffffff;
      opacity: 0.902;
      .toutiao{
        font-size: 33px;
      }
      &:before{
        content: '';
        width: 1px;
        height: 100%;
        background: url("~@/assets/gradient-gray-line.png");
        position: absolute;
        left: 0;
        background-size: contain;
      }
    }
  }
}
</style>
