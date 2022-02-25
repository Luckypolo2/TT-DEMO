<template>
<div class="update-gender">
  <van-picker
    title="性别"
    show-toolbar
    :columns="columns"
    @confirm="onConfirm"
    @cancel="$emit('close')"
    @change="onChange"
    :default-index="value"
  />
</div>
</template>

<script>
import { updateUserProfile } from '@/api/user'

export default {
  name: 'UpdateGender',
  data () {
    return {
      columns: ['男', '女'],
      localGender: this.value
    }
  },
  props: {
    value: {
      type: Number,
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
        const localGender = this.localGender
        console.log(localGender)
        await updateUserProfile({
          gender: localGender
        })
        this.$emit('input', localGender)
        this.$emit('close')
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('失败')
        console.log(err)
      }
    },
    onChange (picker, value, index) {
      this.localGender = index
    }
  }
}
</script>

<style scoped>

</style>
