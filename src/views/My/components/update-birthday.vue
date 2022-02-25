<template>
<div class="update-birthday">
  <van-datetime-picker
    v-model="currentDate"
    type="date"
    title="选择年月日"
    :min-date="minDate"
    :max-date="maxDate"
    @cancel="$emit('close')"
    @confirm="onConfirm"
  />
</div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
import dayjs from 'dayjs'

export default {
  name: 'UpdateBirthday',
  data () {
    return {
      minDate: new Date(1912, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
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
        const localBirthday = dayjs(this.currentDate).format('YYYY-MM-DD')
        console.log(localBirthday)
        await updateUserProfile({
          birthday: localBirthday
        })
        this.$emit('input', localBirthday)
        this.$emit('close')
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('失败')
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>

</style>
