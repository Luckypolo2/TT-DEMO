import request from '@/utils/request'

export const getComments = (params) => {
  return request({
    method: 'GET',
    url: '/v1_0/comments',
    params
  })
}
