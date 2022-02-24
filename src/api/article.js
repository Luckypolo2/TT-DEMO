import request from '@/utils/request'

export const getArticles = (params) => {
  return request({
    method: 'GET',
    url: '/v1_0/articles',
    params
  })
}
export const getArticleById = (articleId) => {
  return request({
    method: 'GET',
    url: `/v1_0/articles/${articleId}`
  })
}
export const addCollect = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: { target }
  })
}
export const deleteCollect = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${target}`
  })
}
export const addLike = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/article/likings',
    date: { target }
  })
}
export const deleteLike = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/likings/${target}`
  })
}
