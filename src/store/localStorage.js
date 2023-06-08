const key = 'storage_admin_key'
const USERINFO_KEY = `userInfo_${key}`

export const clearAllStorage = () => {
  localStorage.clear()
}

export function setObject(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj))
}

export function getObject(key) {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch (e) {
    return undefined
  }
}

export function getUserInfo() {
  return getObject(USERINFO_KEY)
}

export function setUserInfo(data) {
  setObject(USERINFO_KEY, data)
}
