<template>
<div class="login-container">
  <van-nav-bar
    title="登录"
    class="page-nav-bar"
  />
  <van-form @submit="onSubmit" ref="loginForm">
    <van-field
      v-model="user.mobile"
      name="mobile"
      placeholder="请输入手机号"
      :rules="userFormRules.mobile"
      type="number"
      maxlength="11"
    >
      <i slot="left-icon" class="toutiao toutiao-shouji"></i>
    </van-field>
    <van-field
      v-model="user.code"
      name="code"
      placeholder="请输入验证码"
      :rules="userFormRules.code"
      type="number"
      maxlength="6"
    >
      <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
      <template #button>
        <van-count-down v-if="isCountDownShow" :time="1000 * 60" format="ss s" @finish="isCountDownShow = false"/>
        <van-button v-else class="send-sms-btn" size="small" type="default" round
                    @click="onSendSms" native-type="button">发送验证码</van-button>
      </template>
    </van-field>
    <div class="login-btn-warp">
      <van-button class="login-btn"  block type="info" native-type="submit">登录</van-button>
    </div>
  </van-form>
</div>
</template>

<script>
import { login, sendSms } from '@/api/user'

export default {
  name: 'Login',
  data () {
    return {
      isCountDownShow: false,
      user: {
        mobile: '',
        code: ''
      },
      userFormRules: {
        mobile: [{ required: true, message: '请输入手机号' },
          { pattern: /^1[3|5|7|8]\d{9}$/, message: '手机号格式错误' }],
        code: [{ required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }]
      }
    }
  },
  methods: {
    async onSubmit () {
      const user = this.user
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data: res } = await login(user)
        console.log('登录成功', res.data)
        this.$store.commit('setUser', res.data)
        this.$toast.success('登录成功')
      } catch (e) {
        if (e.response.status === 400) {
          this.$toast.fail('手机号或验证码出错')
        } else {
          this.$toast.fail('登录失败,未知错误')
        }
      }
    },
    async onSendSms () {
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        this.$toast.fail('手机号无效')
        return console.log(err)
      }
      this.isCountDownShow = true
      try {
        const res = await sendSms(this.user.mobile)
        this.$toast('发送成功')
        console.log('发送成功', res)
      } catch (err) {
        console.log('发送失败', err)
        if (err.response.status === 429) {
          this.$toast('发送太频繁')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-container{
  .toutiao{
    font-size: 37px;
  }
  .send-sms-btn{
    background-color: #ededed;
    width: 152px;
    height: 46px;
    line-height: 46px;
    font-size: 22px;
    color: #666;
  }
  .login-btn-warp{
    padding: 53px 33px;
    .login-btn{
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
