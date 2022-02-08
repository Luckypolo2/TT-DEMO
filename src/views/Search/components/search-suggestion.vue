<template>
<div class="search-suggestion">
  <van-cell icon="search" v-for="(item, index) in suggestions" :key="index" @click="$emit('search', item)">
    <div slot="title" v-html="highlight(item)"></div>
  </van-cell>
</div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash'

export default {
  name: 'SearchSuggestion',
  data () {
    return {
      suggestions: []
    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  watch: {
    // 监听输入变化
    searchText: {
      // 防抖处理,引入lodash工具库
      handler: debounce(function (value) {
        this.loadSearchSuggestions(value)
      }, 200),
      // handler (value) {
      //   console.log(value)
      // },
      // 侦听开始立即生效
      immediate: true
    }
  },
  methods: {
    async loadSearchSuggestions (q) {
      const { data: res } = await getSearchSuggestions(q)
      this.suggestions = res.data.options
      console.log(res)
    },
    highlight (text) {
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, `<span class="active">${this.searchText}</span>`)
    }
  }
}
</script>

<style scoped lang="less">
.search-suggestion{
  /deep/span.active{
    color: #3296fa;
  }
}

</style>
