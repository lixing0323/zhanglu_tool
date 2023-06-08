import { request } from '@/utils/request'

export function postItemApi(data) {
  return request({ url: 'http/addNewsCategoryItem', method: 'post', data: data })
}

export function updateItemApi(data) {
  return request({ url: 'http/updateNewsCategoryItem', method: 'put', data: data })
}

export function deleteItemApi(data) {
  return request({ url: 'http/deleteNewsCategoryItem', method: 'delete', data: data })
}

export function getListApi(params) {
  return request({ url: 'http/getNewsCategoryList', method: 'get', params: params })
}
