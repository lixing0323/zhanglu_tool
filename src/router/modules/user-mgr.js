import Layout from '@/layout'

export const userMgrRouter = {
  path: '/userMgr',
  redirect: '/userMgr/list',
  component: Layout,
  name: 'UserMgr',
  meta: { title: '用户管理' },
  children: [
    {
      path: 'list',
      component: () => import('@/views/user-mgr/index'),
      name: 'UserMgrList',
      meta: { title: '用户管理', icon: 'accountMgr', breadcrumb: false }
    }
  ]
}
