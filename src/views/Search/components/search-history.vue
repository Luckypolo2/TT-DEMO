<template>
<div class="search-history">
  <van-cell title="搜索历史">
    <template v-if="isDeleteShow">
      <span @click="$emit('delete',[])">全部删除</span>
      &nbsp;&nbsp;
      <span @click="isDeleteShow = false">完成</span>
    </template>
    <van-icon v-else name="delete" @click="isDeleteShow = true"></van-icon>
  </van-cell>
  <van-cell v-for="(item, index) in searchHistories" :key="index" :title="item" @click="onHistoryClick(item, index)" >
    <van-icon v-show="isDeleteShow" name="close"></van-icon>
  </van-cell>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SearchHistory',
  data () {
    return {
      isDeleteShow: false
    }
  },
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    // 历史记录删除
    delete (index) {
      const v = this.searchHistories
      v.splice(index, 1)
      return v
    },
    onHistoryClick (item, index) {
      if (this.isDeleteShow) {
        this.$emit('delete', this.delete(index), item)
        // this.$emit('deleteItem', this.delete(index))
      } else {
        this.$emit('search', item)
      }
    }
  }
}
</script>

<style scoped>

</style>
