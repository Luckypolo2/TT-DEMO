<template>
<div class="my-container">
  <!--  已登录-->
  <div v-if="user" class="header user-info">
    <div class="base-info">
      <div class="left">
        <van-image class="avatar" round fit="cover" :src="userInfo['photo']" />
        <span class="name">{{ userInfo['name'] }}</span>
      </div>
      <div class="right">
        <van-button size="mini" round to="/user/profile">编辑资料</van-button>
      </div>
    </div>
    <div class="data-stats">
      <div class="data-item">
        <span class="count">{{ userInfo['art_count'] }}</span>
        <span class="text">头条</span>
      </div>
      <div class="data-item">
        <span class="count">{{ userInfo['fans_count'] }}</span>
        <span class="text">关注</span>
      </div>
      <div class="data-item">
        <span class="count">{{ userInfo['follow_count'] }}</span>
        <span class="text">粉丝</span>
      </div>
      <div class="data-item">
        <span class="count">{{userInfo['like_count']}}</span>
        <span class="text">获赞</span>
      </div>
    </div>
  </div>
<!--  未登录-->
  <div v-else class="header not-login">
    <div class="login-btn" @click="$router.push('/login')">
      <img src="~@/assets/mobile.png" alt="" class="mobile-img">
      <span class="text">登录 / 注册</span>
    </div>
  </div>
<!--  宫格导航-->
  <van-grid :column-num="2" clickable class="grid-nav">
    <van-grid-item class="grid-item">
      <i slot="icon" class="toutiao toutiao-shoucang"></i>
      <span slot="text" class="text">收藏</span>
    </van-grid-item>
    <van-grid-item class="grid-item">
      <i slot="icon" class="toutiao toutiao-lishi"></i>
      <span slot="text" class="text">历史</span>
    </van-grid-item>
  </van-grid>
<!--  CELL-->
  <van-cell-group class="cell-group">
    <van-cell title="消息通知" is-link/>
    <van-cell title="小智同学"  is-link/>
  </van-cell-group>
  <van-cell v-if="user" class="logout-cell" title="退出登录" @click="onLogout"/>
</div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'My',
  data () {
    return {
      userInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    if (this.user) {
      this.loadUserInfo()
    }
  },
  methods: {
    onLogout () {
      this.$dialog.confirm({
        title: '确认退出吗'
      })
        .then(() => {
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          console.log('取消退出')
        })
    },
    async loadUserInfo () {
      try {
        const { data: res } = await getUserInfo()
        console.log(res)
        this.userInfo = res.data
      } catch (err) {
        this.$toast('获取数据失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.my-container{
  .header{
    height: 361px;
    background: url("~@/assets/banner.png");
    background-size: cover ;
  }
  .not-login{
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .mobile-img{
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text{
        font-size: 28px;
        color: #fff;
      }
    }
  }
  .user-info{
    box-sizing: border-box;
    .base-info{
      padding: 76px 32px 23px;
      height: 131px;
      //background-color: pink;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left{
        display: flex;
        align-items: center;
        justify-content: center;
        .avatar{
          width: 132px;
          height: 132px;
          margin-right: 23px;
          border: 2px solid white;
        }
        .name{
          font-size: 30px;
          color: #ffffff;
        }
      }
      .right{}
    }
    .data-stats{
      height: 130px;
      //background-color: gray;
      display: flex;
      justify-content: center;
      .data-item{
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: white;
        .count{
          font-size: 36px;
        }
        .text{
          font-size: 23px;
          padding-left: 5px;
        }
      }
    }
  }
  .grid-nav{
    .grid-item{
      height: 141px;
      .toutiao{
        font-size: 45px;
      }
      .text{
        font-size: 28px;
      }
      .toutiao-shoucang{
        color: #eb5253;
      }
      .toutiao-lishi{
        color: #ff9d1d;
      }
    }
  }
  .cell-group{
    margin-top: 5px;
  }
  .logout-cell{
    text-align: center;
    color: #eb5253;
    margin-top: 10px;
  }
}
</style>
