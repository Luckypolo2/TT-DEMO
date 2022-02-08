<template>
<div class="article-container">
  <van-nav-bar class="page-nav-bar" left-arrow title="黑马头条" @click-left="$router.back()" fixed></van-nav-bar>
  <div class="main-wrap">
<!--    前置加载页面-->
    <van-loading v-if="loading" size="24px" vertical class="loading-wrap">加载中...</van-loading>
<!--    文章内容-->
    <div v-else-if="article.title" class="article-detail">
      <h1 class="article-title">{{ article.title }}</h1>
<!--      用户信息-->
      <van-cell class="user-info" center :border="false">
        <van-image slot="icon" round fit="cover" class="avatar" :src="article.aut_photo" ></van-image>
        <div class="username" slot="title">{{ article.aut_name }}</div>
        <div class="pub-time" slot="label">{{ article.pubdate | relativeTime }}</div>
        <van-button v-if="article.is_followed" class="user-btn" slot="default" round type="info" @click="onFollow">已关注</van-button>
        <van-button v-else class="user-btn" slot="default" round type="info" icon="plus" @click="onFollow">关注</van-button>
      </van-cell>
<!--      文章内容页-->
      <div class="article-content markdown-body" v-html="article.content"></div>
      <van-divider>正文结束</van-divider>
    </div>
    <!-- 加载失败：404 -->
    <div v-else-if="errStatus === 404" class="error-wrap">
      <van-icon name="failure" />
      <p class="text">该资源不存在或已删除！</p>
    </div>
    <!-- /加载失败：404 -->

    <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
    <div v-else class="error-wrap">
      <van-icon name="failure" />
      <p class="text">内容加载失败！</p>
      <van-button class="retry-btn" @click="loadArticle">点击重试</van-button>
    </div>
    <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
  </div>
  <!-- 底部区域 -->
  <div class="article-bottom">
    <van-button
      class="comment-btn"
      type="default"
      round
      size="small"
    >写评论</van-button>
    <van-icon
      name="comment-o"
      info="123"
      color="#777"
    />
    <van-icon
      color="#777"
      name="star-o"
    />
    <van-icon
      color="#777"
      name="good-job-o"
    />
    <van-icon name="share" color="#777777"></van-icon>
  </div>
  <!-- /底部区域 -->
</div>
</template>

<script>
import { getArticleById } from '@/api/article'
import { addFollow, deleteFollow } from '@/api/user'

export default {
  name: 'Article',
  data () {
    return {
      article: {},
      loading: false,
      errStatus: 0
    }
  },
  props: {
    articleID: {
      type: [String, Number, Object],
      required: true
    }
  },
  created () {
    this.loadArticle()
  },
  methods: {
    async loadArticle () {
      this.loading = true
      try {
        const { data: res } = await getArticleById(this.articleID)
        // 错误模拟
        // if (Math.random() > 0.5) {
        //   JSON.parse('abc')
        // }
        console.log(res)
        this.article = res.data
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errStatus = 404
        }
      }
      this.loading = false
    },
    async onFollow () {
      try {
        if (this.article.is_followed) {
          await deleteFollow(this.article.aut_id)
        } else {
          await addFollow(this.article.aut_id)
        }
        this.article.is_followed = !this.article.is_followed
      } catch (err) {
        let message = '出错，重试'
        if (err.response && err.response.status === 400) {
          message = '无法关注自己'
        }
        this.$toast(message)
      }
    }
  }
}
</script>

<style scoped lang="less">
@import "github-markdown.css";
.article-container{
  padding: 94px 25px;
  height: 79vh;
  overflow-y: auto;
  .main-wrap{
    .loading-wrap{
      padding: 100px 0;
    }
    .article-detail{
      .article-title{
        font-size: 42px;
      }
      .user-info{
        padding: unset;
        background-color: unset;
        .avatar{
          width: 84px;
          height: 84px;
          margin-right: 20px;
        }
        .user-btn{
          height: 64px;
          width: 200px;
          font-size: 24px;
        }
        .article-content {
          padding: 55px 32px;
          /deep/ p {
            text-align: justify;
          }
        }
      }
    }
    .error-wrap {
      padding: 200px 32px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: unset;
      .van-icon {
        font-size: 122px;
        color: #b4b4b4;
      }
      .text {
        font-size: 30px;
        color: #666666;
        margin: 33px 0 46px;
      }
      .retry-btn {
        width: 280px;
        height: 70px;
        line-height: 70px;
        border: 1px solid #c3c3c3;
        font-size: 30px;
        color: #666666;
      }
    }
  }
  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
