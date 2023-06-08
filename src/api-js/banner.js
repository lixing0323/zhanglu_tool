import { request } from '@/utils/request'

export function postItemApi(data) {
  return request({ url: 'http/addBannerItem', method: 'post', data: data })
}

export function getItemApi(params) {
  return request({ url: 'http/getBannerItem', method: 'get', params: params })
}

export function updateItemApi(data) {
  return request({ url: 'http/updateBannerItem', method: 'put', data: data })
}

export function deleteItemApi(data) {
  return request({ url: 'http/deleteBannerItem', method: 'delete', data: data })
}

export function getListApi(params) {
  return request({ url: 'http/getBannerList', method: 'get', params: params })
}
