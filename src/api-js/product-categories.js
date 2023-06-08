import { request } from '@/utils/request'

export function postItemApi(data) {
  return request({ url: 'http/addProductCategoryItem', method: 'post', data: data })
}

export function updateItemApi(data) {
  return request({ url: 'http/updateProductCategoryItem', method: 'put', data: data })
}

export function deleteItemApi(data) {
  return request({ url: 'http/deleteProductCategoryItem', method: 'delete', data: data })
}

export function getListApi(params) {
  return request({ url: 'http/getProductCategoryList', method: 'get', params: params })
}
