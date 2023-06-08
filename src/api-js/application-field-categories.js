import { request } from '@/utils/request'

export function postItemApi(data) {
  return request({ url: 'http/addApplicationFieldCategoryItem', method: 'post', data: data })
}

export function updateItemApi(data) {
  return request({ url: 'http/updateApplicationFieldCategoryItem', method: 'put', data: data })
}

export function deleteItemApi(data) {
  return request({ url: 'http/deleteApplicationFieldCategoryItem', method: 'delete', data: data })
}

export function getListApi(params) {
  return request({ url: 'http/getApplicationFieldCategoryList', method: 'get', params: params })
}
