<template>
  <van-button :icon="value === 1 ? 'good-job':'good-job-o'" :class="{liked:value === 1}"  :loading="loading" @click="onLike"></van-button>
</template>

<script>
import { addLike, deleteLike } from '@/api/article'

export default {
  name: 'LikeArticle',
  data () {
    return {
      loading: false
    }
  },
  props: {
    value: {
      type: Number,
      required: true
    },
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  methods: {
    async onLike () {
      this.loading = true
      let status = -1
      try {
        if (this.value === 1) {
          await deleteLike(this.articleId)
        } else {
          await addLike(this.articleId)
          status = 1
        }
        this.$emit('input', status)
      } catch (err) {
        this.$toast.fail('请求失败')
      }
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less">
.liked{
  color: #ff7b72;
}
</style>
