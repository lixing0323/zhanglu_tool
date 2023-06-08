import Cookies from 'js-cookie'

const key = 'cookies_admin_key'
const TOKEN_KEY = `token_${key}`
const API_CONFIG_KEY = `api_config_${key}`

export function getToken() {
  return Cookies.get(TOKEN_KEY)
}

export function setToken(token) {
  return Cookies.set(TOKEN_KEY, token)
}

export function removeToken() {
  return Cookies.remove(TOKEN_KEY)
}

export function getApiConfig() {
  return Cookies.get(API_CONFIG_KEY)
}

export function setApiConfig(config) {
  return Cookies.set(API_CONFIG_KEY, config)
}
