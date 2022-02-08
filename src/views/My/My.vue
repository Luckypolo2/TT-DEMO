<template>
<div class="my-container">
<!--  未登录-->
  <div class="header not-login">
    <div class="login-btn" @click="$router.push('/login')">
      <img src="~@/assets/mobile.png" alt="" class="mobile-img">
      <span class="text">登录 / 注册</span>
    </div>
  </div>
<!--  已登录-->
  <div class="header user-info">
    <div class="base-info">
      <div class="left">
        <van-image class="avatar" round fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
        <span class="name">用户名</span>
      </div>
      <div class="right">
        <van-button size="mini" round>编辑资料</van-button>
      </div>
    </div>
    <div class="data-stats">
      <div class="data-item">
        <span class="count">10</span>
        <span class="text">头条</span>
      </div>
      <div class="data-item">
        <span class="count">10</span>
        <span class="text">关注</span>
      </div>
      <div class="data-item">
        <span class="count">10</span>
        <span class="text">粉丝</span>
      </div>
      <div class="data-item">
        <span class="count">10</span>
        <span class="text">获赞</span>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'My'
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
}
</style>
