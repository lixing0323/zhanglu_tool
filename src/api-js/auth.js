// auto created
import { request } from '@/utils/request'
import { getSystemInfoSync } from '@/utils/device/get-system-info'
import { getToken } from '@/utils/cookies'

export function postUniIdPages(url, params) {
  return request({ url: url, method: 'post', data: {
    'clientInfo': getSystemInfoSync(),
    'uniIdToken': getToken() ? getToken() : '',
    'params': params
  }})
}

export function postAuth(data) {
  return postUniIdPages('common/login', data)
}

export function loginApi(username, password) {
  return postAuth({ username: username, password: password })
}

export function logoutApi() {
  return postUniIdPages('common/logout')
}
