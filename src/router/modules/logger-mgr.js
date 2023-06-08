import Layout from '@/layout'

export const loggerMgrRouter = {
  path: '/loggerMgr',
  redirect: '/loggerMgr/list',
  component: Layout,
  name: 'loggerMgr',
  meta: { title: '日志管理' },
  children: [
    {
      path: 'list',
      component: () => import('@/views/logger-mgr/index'),
      name: 'LoggerMgrList',
      meta: { title: '日志管理', icon: 'contentMgr', breadcrumb: false }
    }
  ]
}
