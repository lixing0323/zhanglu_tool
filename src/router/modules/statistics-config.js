import Layout from '@/layout'
import { getMenuName } from '@/utils/business'

export const statisticsConfigRouter = {
  path: '/statisticsConfig',
  redirect: '/statisticsConfig/list',
  component: Layout,
  name: 'statisticsConfig',
  meta: { title: `${getMenuName()}统计配置` },
  children: [
    {
      path: 'list',
      component: () => import('@/views/statistics-config/index'),
      name: 'statisticsConfigList',
      meta: { title: `${getMenuName()}统计配置`, icon: 'productApplication', breadcrumb: false }
    }
  ]
}
