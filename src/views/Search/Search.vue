<template>
<div class="search-container">
  <form action="/">
    <van-search
      v-model="searchText"
      show-action
      placeholder="请输入搜索关键词"
      background="#3296fa"
      @search="onSearch"
      @cancel="onCancel"
      @focus="isResultShow = false"
    />
  </form>
  <!--  搜素结果-->
  <search-result v-if="isResultShow" :search-text="searchText"></search-result>
  <!--  搜索联想-->
  <search-suggestion v-else-if="searchText" :search-text="searchText" @search="onSearch"></search-suggestion>
  <!--  搜索历史-->
  <!--  sync同步子组件事件-->
  <search-history v-else :search-histories="searchHistories" @search="onSearch" @delete="onDelete"></search-history>
</div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-result'
import { getItem, setItem } from '@/utils/storage'
export default {
  name: 'Search',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  data () {
    return {
      searchText: '',
      searchHistories: [],
      fakeOnlineData: ['a', 'b', 'c', 'd'],
      isResultShow: false
    }
  },
  watch: {
    searchHistories () {
      setItem('search-history', this.searchHistories)
    }
  },
  methods: {
    onSearch (value) {
      console.log(value)
      this.searchText = value
      // 判断是否有历史记录
      const index = this.searchHistories.indexOf(value)
      if (index !== -1) {
        // 删除重复
        this.searchHistories.splice(index, 1)
      }
      // 将搜素结果排在数组最前面
      this.searchHistories.unshift(value)
      this.isResultShow = true
    },
    onCancel () {
      this.$router.back()
    },
    onDelete (v, item) {
      const index = this.fakeOnlineData.indexOf(item)
      if (index !== -1) {
        this.fakeOnlineData.splice(index, 1)
      }
      this.searchHistories = v
    },
    loadUserHistories () {
      let userHistories = getItem('search-history') || []
      console.log(userHistories)
      console.log(this.fakeOnlineData)
      userHistories = [...new Set([...userHistories, ...this.fakeOnlineData])]
      this.searchHistories = userHistories
    }
  },
  created () {
    this.loadUserHistories()
  }
}
</script>

<style scoped lang="less">
.search-container{
  .van-search__action{
    color: white;
  }
}
</style>
