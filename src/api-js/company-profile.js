import { request } from '@/utils/request'

export function postItemApi(data) {
  return request({ url: 'http/addCompanyProfileItem', method: 'post', data: data })
}

export function getItemApi(params) {
  return request({ url: 'http/getCompanyProfileItem', method: 'get', params: params })
}

export function updateItemApi(data) {
  return request({ url: 'http/updateCompanyProfileItem', method: 'put', data: data })
}

export function deleteItemApi(data) {
  return request({ url: 'http/deleteCompanyProfileItem', method: 'delete', data: data })
}

export function getListApi(params) {
  return request({ url: 'http/getCompanyProfileList', method: 'get', params: params })
}
