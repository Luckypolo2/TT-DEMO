import request from '@/utils/request'

export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/channels'
  })
}
export const addUserChannel = (channels) => {
  return request({
    method: 'PUT',
    url: '/v1_0/user/channels',
    data: { channels }
  })
}
export const deleteUserChannel = (channelID) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${channelID}`
  })
}
