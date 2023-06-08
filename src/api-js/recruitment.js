import { request } from '@/utils/request'

export function postItemApi(data) {
  return request({ url: 'http/addRecruitmentItem', method: 'post', data: data })
}

export function getItemApi(params) {
  return request({ url: 'http/getRecruitmentItem', method: 'get', params: params })
}

export function updateItemApi(data) {
  return request({ url: 'http/updateRecruitmentItem', method: 'put', data: data })
}

export function deleteItemApi(data) {
  return request({ url: 'http/deleteRecruitmentItem', method: 'delete', data: data })
}

export function getListApi(params) {
  return request({ url: 'http/getRecruitmentList', method: 'get', params: params })
}
