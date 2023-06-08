import { request } from '@/utils/request'

export function postItemApi(data) {
  return request({ url: 'http/addRolesItem', method: 'post', data: data })
}

export function getItemApi(params) {
  return request({ url: 'http/getRolesItem', method: 'get', params: params })
}

export function updateItemApi(data) {
  return request({ url: 'http/updateRolesItem', method: 'put', data: data })
}

export function deleteItemApi(data) {
  return request({ url: 'http/deleteRolesItem', method: 'delete', data: data })
}

export function getListApi(params) {
  return request({ url: 'http/getRolesList', method: 'get', params: params })
}
