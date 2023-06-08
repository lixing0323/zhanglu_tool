import router from './router'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/cookies'
import getPageTitle from '@/utils/get-page-title'
import { useAuthUserStore } from '@/store/modules/user'
import { usePermissionRoutesStore } from '@/store/modules/permission'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/api-cfg', '/test']
const userStore = useAuthUserStore()

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  document.title = getPageTitle(to.meta.title)
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const permissionRouteStore = usePermissionRoutesStore()

      // 路由store该状态非空，代表已经通过roles初始化过路由
      // 为空则会做第一次路由初始化
      if (permissionRouteStore.permissionRoutes.length > 0) {
        next()
      } else {
        try {
          permissionRouteStore.refreshRouter(userStore.roles)
          next({ ...to, replace: true })
        } catch (error) {
          await userStore.reset()
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    if (to.meta.noAuth === true) {
      next()
      return
    }
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
