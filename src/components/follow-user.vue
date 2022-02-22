<template>
  <van-button v-if="isFollowed" class="user-btn" slot="default" round type="info" @click="onFollow" :loading="followLoading">已关注</van-button>
  <van-button v-else class="user-btn" slot="default" round type="info" icon="plus" @click="onFollow" :loading="followLoading">关注</van-button>
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user'

export default {
  name: 'FollowUser',
  data () {
    return {
      followLoading: false
    }
  },
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [String, Number, Object],
      required: true
    }
  },
  methods: {
    async onFollow () {
      try {
        this.followLoading = true
        if (this.isFollowed) {
          await deleteFollow(this.userId)
        } else {
          await addFollow(this.userId)
        }
        // this.article.is_followed = !this.article.is_followed
        this.$emit('update-is_followed', !this.isFollowed)
      } catch (err) {
        let message = '出错，重试'
        if (err.response && err.response.status === 400) {
          message = '无法关注自己'
        }
        this.$toast(message)
      }
      this.followLoading = false
    }
  }
}
</script>

<style scoped>

</style>
