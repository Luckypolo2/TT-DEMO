<template>
<div class="update-name">
  <van-nav-bar title="设置昵称" left-text="取消" right-text="完成" @click-left="$emit('close')" @click-right="onConfirm"></van-nav-bar>
  <div class="field-wrap">
    <van-field v-model.trim="message" rows="2" autosize type="textarea" maxlength="7" show-word-limit placeholder="请输入昵称"></van-field>
  </div>
</div>
</template>

<script>
import { updateUserProfile } from '@/api/user'

export default {
  name: 'UpdateName',
  data () {
    return {
      message: this.value
    }
  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    async onConfirm () {
      try {
        this.$toast.loading({
          message: '保存中',
          forbidClick: true,
          duration: 0
        })
        const localName = this.message
        if (!localName.length) {
          this.$toast('不能为空')
          return
        }
        await updateUserProfile({
          name: localName
        })
        this.$emit('input', localName)
        this.$emit('close')
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.update-name{
  /deep/.van-nav-bar__title{
    color: unset;
  }
  /deep/.van-nav-bar{
    background: unset;
  }
  .field-wrap{
    padding: 20px;
  }
}

</style>
