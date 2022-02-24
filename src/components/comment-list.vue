<template>
<van-list v-model="loading" :finished="finished"
finished-text="没有更多了" @load="onLoad">
  <comment-item v-for="(item, index) in list" :key="index" :comment="item"></comment-item>
</van-list>
</template>

<script>
import { getComments } from '@/api/comment'
import CommentItem from '@/components/comment-item'

export default {
  name: 'CommentList',
  components: { CommentItem },
  data () {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10
    }
  },
  props: {
    source: {
      type: [String, Number, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    async onLoad () {
      try {
        const { data: res } = await getComments({
          type: 'a',
          source: this.source,
          offset: this.offset,
          limit: this.limit
        })
        console.log(res)
        const { results } = res.data
        this.list.push(...results)
        this.$emit('onload-success', res.data)
        this.loading = false
        if (results.length) {
          this.offset = res.data.last_id
        } else {
          this.finished = true
        }
      } catch (err) {}
    }
  },
  created () {
    this.onLoad()
  }
}
</script>

<style scoped>

</style>
