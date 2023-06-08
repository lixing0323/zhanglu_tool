import { request } from '@/utils/request'

export function postItemApi(data) {
  return request({ url: 'http/addProductItem', method: 'post', data: data })
}

export function getItemApi(params) {
  return request({ url: 'http/getProductItem', method: 'get', params: params })
}

export function updateItemApi(data) {
  return request({ url: 'http/updateProductItem', method: 'put', data: data })
}

export function deleteItemApi(data) {
  return request({ url: 'http/deleteProductItem', method: 'delete', data: data })
}

export function getListApi(params) {
  return request({ url: 'http/getProductList', method: 'get', params: params })
}
