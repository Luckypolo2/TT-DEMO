<template>
<div class="user-profile">
  <van-nav-bar class="page-nav-bar" title="用户信息" left-arrow @click-left="$router.back()"></van-nav-bar>
  <input type="file" hidden ref="file" @change="onFileChange">
  <van-cell title="头像" is-link center @click="$refs.file.click()">
    <van-image class="avatar" fit="cover" round :src="user.photo"></van-image>
  </van-cell>
  <van-cell title="昵称" :value="user.name" is-link @click="isUpdateNameShow = true"></van-cell>
  <van-cell title="性别" :value="user.gender === 0? '男':'女'" is-link @click="isUpdateGenderShow = true"></van-cell>
  <van-cell title="生日" :value="user.birthday" is-link @click="isUpdateBirthdayShow = true"></van-cell>
<!--  弹出层-->
  <van-popup v-if="isUpdateNameShow" v-model="isUpdateNameShow" style="height: 100%" position="bottom">
    <update-name @close="isUpdateNameShow = false" v-model="user.name"></update-name>
  </van-popup>
  <van-popup v-if="isUpdateGenderShow" v-model="isUpdateGenderShow" position="bottom">
    <update-gender @close="isUpdateGenderShow = false" v-model="user.gender"></update-gender>
  </van-popup>
  <van-popup v-if="isUpdateBirthdayShow" v-model="isUpdateBirthdayShow" position="bottom">
    <update-birthday @close="isUpdateBirthdayShow = false" v-model="user.birthday"></update-birthday>
  </van-popup>
  <van-popup v-if="isUpdatePhotoShow" v-model="isUpdatePhotoShow" position="bottom" style="height: 100%">
    <update-photo :img="img" @close="isUpdatePhotoShow = false" @update-photo="user.photo = $event"></update-photo>
  </van-popup>
</div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from '@/views/My/components/update-name'
import UpdateGender from '@/views/My/components/update-gender'
import UpdateBirthday from '@/views/My/components/update-birthday'
import UpdatePhoto from '@/views/My/components/update-photo'

export default {
  name: 'UserProfile',
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  },
  data () {
    return {
      user: {},
      isUpdateNameShow: false,
      isUpdateGenderShow: false,
      isUpdateBirthdayShow: false,
      isUpdatePhotoShow: false,
      img: null
    }
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile () {
      try {
        const { data: res } = await getUserProfile()
        this.user = res.data
      } catch (err) {
        console.log(err)
        this.$toast.fail('请求失败')
      }
    },
    onFileChange () {
      const file = this.$refs.file.files[0]
      console.log(file)
      const data = window.URL.createObjectURL(file)
      this.img = data
      console.log(data)
      this.isUpdatePhotoShow = true
      this.$refs.file.value = ''
    }
  }
}
</script>

<style scoped lang="less">
.user-profile{
  .avatar{
    width: 60px;
    height: 60px;
  }
  /deep/.van-popup{
    background: #f5f7f9;
  }
}
</style>
