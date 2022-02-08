<template>
<div class="channel-edit">
  <van-cell :border="false">
    <div slot="title" class="title-text">我的频道</div>
    <van-button class="edit-btn" type="danger" plain round size="mini" @click="isEdit = !isEdit">{{isEdit? '完成':'编辑' }}</van-button>
  </van-cell>
  <van-grid :gutter="10" class="my-grid">
    <van-grid-item
                   class="grid-item"
                   v-for="(channel,index) in myChannels"
                   :key="index"
                   @click="onChannelClick(channel, index)">
      <van-icon v-show="isEdit && !fixChannel.includes(channel.id)" slot="icon" name="clear"></van-icon>
      <span class="text" slot="text" :class="{active: index === active}">{{channel.name}}</span>
    </van-grid-item>
  </van-grid>
  <van-cell :border="false">
    <div slot="title" class="title-text">频道推荐</div>
  </van-cell>
  <van-grid :gutter="10" class="recommend-grid">
    <van-grid-item icon="plus"
                   class="grid-item"
                   v-for="(item,index) in recommendedChannels"
                   :key="index"
                   :text="item.name"
                   @click="onAddChannel(item)"/>
  </van-grid>
</div>
</template>

<script>
import { getAllChannels, addUserChannel, deleteUserChannel } from '@/api/channels'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEdit',
  data () {
    return {
      allChannels: [],
      isEdit: false,
      fixChannel: [0]
    }
  },
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  methods: {
    async loadAllChannels () {
      try {
        const { data: res } = await getAllChannels()
        console.log(res)
        this.allChannels = res.data.channels
        console.log(this.allChannels)
      } catch (err) {
        this.$toast('channels请求失败')
      }
    },
    async onAddChannel (channel) {
      this.myChannels.push(channel)
      if (this.user) {
        const channels = this.myChannels.filter(channel => channel.name !== '推荐').map((channel, index) => {
          return {
            id: channel.id,
            seq: index + 1
          }
        })
        console.log(channels)
        try {
          await addUserChannel(channels)
        } catch (err) {
          this.$toast('保存失败')
        }
      } else {
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    },
    async onChannelClick (channel, index) {
      if (this.isEdit) {
        if (this.fixChannel.includes(channel.id)) {
          return
        }
        if (index <= this.active) {
          this.$emit('update-active', this.active - 1, true)
        }
        this.myChannels.splice(index, 1)
        console.log(channel.id)
        if (this.user) {
          try {
            await deleteUserChannel(channel.id)
          } catch (err) {
            this.$toast('删除失败')
          }
        } else {
          setItem('TOUTIAO_CHANNELS', this.myChannels)
        }
      } else {
        this.$emit('update-active', index, false)
      }
    }
  },
  computed: {
    ...mapState(['user']),
    // 计算剩余推荐频道
    recommendedChannels () {
      return this.allChannels.filter(channel => {
        return !this.myChannels.find(myChannel => {
          return myChannel.id === channel.id
        })
      })
    }
  },
  created () {
    this.loadAllChannels()
  }
}
</script>

<style scoped lang="less">
.channel-edit{
  padding: 85px 0;
  .edit-btn{
    padding: 0 25px;
    height: 48px;
    width: 104px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  .title-text{
    font-size: 32px;
    color: #333333;
  }
  .grid-item{
    width: 160px;
    height: 86px;
    /deep/.van-grid-item__content{
      background: #f4f5f6;
      white-space: nowrap;
      .van-grid-item__text,.text{
        font-size: 28px;
        color: #222;
      }
      .active{
        color: red;
      }
      .van-grid-item__icon-wrapper{
        position: unset;
      }
    }
  }
  /deep/.my-grid{
    .grid-item{
      .van-icon-clear{
        position: absolute;
        top: -10px;
        right: -10px;
        z-index: 2;
        color: #cacaca;
        font-size: 30px;
      }
    }
  }
  /deep/.recommend-grid{
    .grid-item{
      .van-grid-item__content{
        flex-direction: row;
        .van-icon-plus{
          font-size: 28px;
          margin-right: 6px;
        }
        .van-grid-item__text{
          margin-top: 0;
        }
      }
    }
  }
}

</style>
