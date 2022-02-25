<template>
  <div class="update-photo">
    <img class="img" :src="img"  alt="" ref="img">
    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="onConfirm">完成</div>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updateUserPhoto } from '@/api/user'
export default {
  name: 'UpdatePhoto',
  data () {
    return {
      cropper: null
    }
  },
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  mounted () {
    this.initCropper()
  },
  methods: {
    initCropper () {
      const image = this.$refs.img
      this.cropper = new Cropper(image, {
        viewMode: 1,
        dragMode: 'move',
        aspectRatio: 1,
        autoCropArea: 1,
        cropBoxMovable: false,
        cropBoxResizable: false,
        background: false,
        movable: true
      })
    },
    onConfirm () {
      this.cropper.getCroppedCanvas().toBlob(async blob => {
        try {
          this.$toast.loading({
            message: '保存中',
            forbidClick: true,
            duration: 0
          })
          const formData = new FormData()
          formData.append('photo', blob)
          const { data: res } = await updateUserPhoto(formData)
          this.$emit('close')
          this.$emit('update-photo', res.data.photo)
          this.$toast.success('成功')
        } catch (err) {
          this.$toast.fail('错误')
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.update-photo{
  background: #000;
  height: 100%;
  .toolbar{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
  }
  .cancel,.confirm{
    width: 90px;
    height: 90px;
    font-size: 30px;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.img{
  display: block;
  max-width: 100%;
}

</style>
