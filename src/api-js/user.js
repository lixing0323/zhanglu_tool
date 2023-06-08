import { request } from '@/utils/request'
import { postUniIdPages } from '@/api-js/auth'

export function getUserPersonalInformation(uid) {
  return request({ url: 'user/getInfo', method: 'get', params: { uid: uid }})
}

export function getListApi(params) {
  return request({ url: 'http/getUserList', method: 'get', params: params })
}

export function postItemApi(data) {
  return postUniIdPages('common/addUser', data)
}

export function updatePasswordApi(data) {
  return postUniIdPages('common/updatePwd', data)
}

export function updateItemApi(data) {
  return postUniIdPages('common/updateUser', data)
}
