import { request } from '@/utils/request'

export function postItemApi(data) {
  return request({ url: 'http/addSystemWordItem', method: 'post', data: data })
}

export function getItemApi(params) {
  return request({ url: 'http/getSystemWordItem', method: 'get', params: params })
}

export function deleteItemApi(data) {
  return request({ url: 'http/deleteSystemWordItem', method: 'delete', data: data })
}

export function getListApi(params) {
  return request({ url: 'http/getSystemWordList', method: 'get', params: params })
}
