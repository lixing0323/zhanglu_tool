import { defineStore } from 'pinia'
import { getToken, removeToken, setToken } from '@/utils/cookies'
import { clearAllStorage, getUserInfo, setUserInfo } from '@/store/localStorage'
import { resetRouter } from '@/router'
import { clearAllStates, pinia } from '@/store'

const _useAuthUserStore = defineStore('authUser', {
  state: () => {
    return {
      token: getToken(),
      name: '',
      avatar: '',
      permissions: [],
      userInfo: getUserInfo()
    }
  },
  getters: {
    // 只有需要计算的属性才需要放到getter中，其他状态字段直接能获得
    roles: state => {
      if (state.userInfo.roles && state.userInfo.roles.length > 0) {
        return state.userInfo.roles
      }
      return ['NO_ROLE']
    }
  },
  actions: {
    async login(username, password) {
      const newToken = { token: '123456' }
      const userInfo = { role: ['admin'], username: '管理员' }
      setToken(newToken.token)
      userInfo.roles = userInfo.role
      this.userInfo = userInfo
      setUserInfo(userInfo)
      return userInfo
    },

    async getUserInfo() {
      return getUserInfo()
    },

    async logout() {
      this.reset()
    },

    reset() {
      removeToken()
      resetRouter()
      clearAllStorage()
      clearAllStates()
    }
  }
})

export function useAuthUserStore() {
  return _useAuthUserStore(pinia)
}
