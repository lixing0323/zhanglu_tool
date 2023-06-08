import Layout from '@/layout'

export const baseDataShowRouter = {
  path: '/baseDataShow',
  redirect: '/baseDataShow/list',
  component: Layout,
  name: 'BaseDataShow',
  meta: { title: '数据展示', icon: 'userLabelMgr' },
  children: [
    {
      path: 'list',
      component: () => import('@/views/base-data-show/index'),
      name: 'BaseDataShowList',
      meta: { title: '数据展示', icon: 'userLabelMgr', breadcrumb: false }
    }
  ]
}
