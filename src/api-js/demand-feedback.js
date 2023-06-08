import { request } from '@/utils/request'

export function postItemApi(data) {
  return request({ url: 'http/addDemandFeedbackItem', method: 'post', data: data })
}

export function getItemApi(params) {
  return request({ url: 'http/getDemandFeedbackItem', method: 'get', params: params })
}

export function deleteItemApi(data) {
  return request({ url: 'http/deleteDemandFeedbackItem', method: 'delete', data: data })
}

export function getListApi(params) {
  return request({ url: 'http/getDemandFeedbackList', method: 'get', params: params })
}
