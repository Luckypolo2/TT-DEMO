<template>
<div class="article-list">
  <van-pull-refresh v-model="isReFreshLoading" @refresh="onRefresh"
                    :success-text="reFreshSuccessText"
                    success-duration="600">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <article-item v-for="(item, index) in list" :key="index"
      :article="item"></article-item>
<!--      <van-cell v-for="(item, index) in list" :key="index" :title="item.title" />-->
    </van-list>
  </van-pull-refresh>
</div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      isReFreshLoading: false,
      reFreshSuccessText: '刷新成功'
    }
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  methods: {
    async onLoad () {
      try {
        const { data: res } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })
        // 模拟数据出错-上拉
        // if (Math.random() > 0.5) {
        //   JSON.parse('weewewq')
        // }
        console.log(res)
        const { results } = res.data
        this.list.push(...results)
        this.loading = false
        if (results.length) {
          // 更新获取下页数据时间戳
          this.timestamp = res.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    },
    async onRefresh () {
      try {
        const { data: res } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 1
        })
        // 模拟数据出错-下拉
        // if (Math.random() > 0.5) {
        //   JSON.parse('weewewq')
        // }
        console.log(res)
        const { results } = res.data
        this.list.unshift(...results)
        this.isReFreshLoading = false
        this.reFreshSuccessText = `刷新成功，更新了${results.length}条数据`
      } catch (err) {
        this.reFreshSuccessText = '刷新失败'
        this.isReFreshLoading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.article-list{
  height: 79vh;
  overflow-y: auto;
}

</style>
