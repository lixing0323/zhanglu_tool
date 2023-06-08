import { request } from '@/utils/request'

export function postItemApi(data) {
  return request({ url: 'http/addApplicationFieldItem', method: 'post', data: data })
}

export function getItemApi(params) {
  return request({ url: 'http/getApplicationFieldItem', method: 'get', params: params })
}

export function updateItemApi(data) {
  return request({ url: 'http/updateApplicationFieldItem', method: 'put', data: data })
}

export function deleteItemApi(data) {
  return request({ url: 'http/deleteApplicationFieldItem', method: 'delete', data: data })
}

export function getListApi(params) {
  return request({ url: 'http/getApplicationFieldList', method: 'get', params: params })
}
