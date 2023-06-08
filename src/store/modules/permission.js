import router, { asyncRoutes, constantRoutes, resetRouter } from '@/router'
import { defineStore } from 'pinia'
import { pinia } from '@/store'

// 指定路由的route.meta.roles，与指定的roles，存在交集即授权
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles && route.meta.forbidRoles) {
    return roles.some(role => route.meta.roles.includes(role)) && !roles.some(role => route.meta.forbidRoles.includes(role))
  } else if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else if (route.meta && route.meta && route.meta.forbidRoles) {
    return !roles.some(role => route.meta.forbidRoles.includes(role))
  } else {
    return true
  }
}

// 递归过滤出给定角色集可以访问的路由
function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const _usePermissionRoutesStore = defineStore('permissionRoutes', {
  state: () => {
    return {
      routes: [],
      addRoutes: []
    }
  },
  getters: {
    permissionRoutes: state => state.routes
  },
  actions: {
    generateRoutes(roles) {
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      this.addRoutes = accessedRoutes
      this.routes = constantRoutes.concat(accessedRoutes)
      return accessedRoutes
    },
    refreshRouter(roles) {
      resetRouter()
      const accessRoutes = this.generateRoutes(roles)
      router.addRoutes(accessRoutes)
    }
  }
})

export function usePermissionRoutesStore() {
  return _usePermissionRoutesStore(pinia)
}
