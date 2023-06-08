import { request } from '@/utils/request'

export function postItemApi(data) {
  return request({ url: 'http/addSalesFeedbackItem', method: 'post', data: data })
}

export function getItemApi(params) {
  return request({ url: 'http/getSalesFeedbackItem', method: 'get', params: params })
}

export function updateItemApi(data) {
  return request({ url: 'http/updateSalesFeedbackItem', method: 'put', data: data })
}

export function deleteItemApi(data) {
  return request({ url: 'http/deleteSalesFeedbackItem', method: 'delete', data: data })
}

export function getListApi(params) {
  return request({ url: 'http/getSalesFeedbackList', method: 'get', params: params })
}
