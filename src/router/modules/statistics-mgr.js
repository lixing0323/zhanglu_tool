import Layout from '@/layout'
import { getMenuName } from '@/utils/business'

export const statisticsMgrRouter = {
  path: '/statisticsMgr',
  redirect: '/statisticsMgr/list',
  component: Layout,
  name: 'statisticsMgr',
  meta: { title: `${getMenuName()}统计管理` },
  children: [
    {
      path: 'list',
      component: () => import('@/views/statistics-mgr/index'),
      name: 'StatisticsMgrList',
      meta: { title: `${getMenuName()}统计管理`, icon: 'productMgr', breadcrumb: false }
    }
  ]
}
