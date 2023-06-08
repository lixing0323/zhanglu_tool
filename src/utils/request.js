import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import { getToken } from '@/utils/cookies'
import { getApiConfig } from '@/utils/cookies'
import { useAuthUserStore } from '@/store/modules/user'

function getBaseUrl() {
  const url = getApiConfig()
  return url || process.env.VUE_APP_BASE_API
}

function reLogin(errMsg) {
  MessageBox.confirm(errMsg, '信息', { confirmButtonText: '确定', showCancelButton: false, type: 'warning' })
    .then(() => {
      useAuthUserStore().reset()
      location.replace('/login')
    })
}

const TIMEOUT_MS = 60000

const requestPreprocess = config => {
  if (getToken()) {
    config.headers['Authorization'] = `JWT ${getToken()}`
  }
  return config
}

const responsePostProcess = response => {
  const res = response.data

  // if the custom code is not 20000, it is judged as an error.
  if (res.status === 0) {
    // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    if (res.errCode === 401) {
      reLogin(res.errMsg)
    } else {
      Message({ message: res.errMsg || 'Error', type: 'error', duration: 2000 })
    }
    return Promise.reject(new Error(res.errMsg || 'Error'))
  } else if (res.errMsg) {
    // uni-id-co 接口返回的值
    if (res.errCode === 'uni-id-token-expired') {
      reLogin('token已过期，请重新登录')
    } else {
      Message({ message: res.errMsg || 'Error', type: 'error', duration: 2000 })
    }
  } else {
    return response
  }
}
const responseError = error => {
  if (error.code === 'ECONNABORTED') {
    Message({ message: `响应时间超过 ${TIMEOUT_MS / 1000} 秒`, type: 'error', duration: 3 * 1000 })
  } else {
    Message({ message: error.message, type: 'error', duration: 3 * 1000 })
  }
  return Promise.reject(error)
}

const request = axios.create({
  baseURL: getBaseUrl(),
  timeout: TIMEOUT_MS
})

axios.interceptors.request.use(
  requestPreprocess,
  error => {
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(
  responsePostProcess, responseError
)

// request实例对象提供给旧api调用
request.interceptors.request.use(
  requestPreprocess,
  error => {
    return Promise.reject(error)
  }
)
request.interceptors.response.use(
  responsePostProcess, responseError
)
// 第二响应拦截器用于只返回业务data
request.interceptors.response.use(response => {
  return response.data
}, error => {
  return Promise.reject(error)
})

export {
  request
}
