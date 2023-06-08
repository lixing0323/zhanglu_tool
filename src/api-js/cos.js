import { request } from '@/utils/request'

export function getAuthorization(methods, pathname) {
  return request({
    url: 'cos',
    method: 'post',
    data: { method: methods, pathname: pathname }
  })
}
