import Layout from '@/layout'

export const dataMgrRouter = {
  path: '/dataMgr',
  redirect: '/dataMgr/list',
  component: Layout,
  name: 'DataMgr',
  meta: { title: '数据管理' },
  children: [
    {
      path: 'list',
      component: () => import('@/views/base-data-mgr/index'),
      name: 'DataMgrList',
      meta: { title: '数据管理', icon: 'systemMgr', breadcrumb: false }
    }
  ]
}
