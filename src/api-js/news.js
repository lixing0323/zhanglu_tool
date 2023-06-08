import { request } from '@/utils/request'

export function postItemApi(data) {
  return request({ url: 'http/addNewsItem', method: 'post', data: data })
}

export function getItemApi(params) {
  return request({ url: 'http/getNewsItem', method: 'get', params: params })
}

export function updateItemApi(data) {
  return request({ url: 'http/updateNewsItem', method: 'put', data: data })
}

export function deleteItemApi(data) {
  return request({ url: 'http/deleteNewsItem', method: 'delete', data: data })
}

export function getListApi(params) {
  return request({ url: 'http/getNewsList', method: 'get', params: params })
}
