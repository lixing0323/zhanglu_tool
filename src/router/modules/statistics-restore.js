import Layout from '@/layout'
import { getMenuName } from '@/utils/business'

export const statisticsRestoreRouter = {
  path: '/statisticsRestore',
  redirect: '/statisticsRestore/list',
  component: Layout,
  name: 'statisticsRestore',
  meta: { title: `${getMenuName()}统计恢复` },
  children: [
    {
      path: 'list',
      component: () => import('@/views/statistics-restore/index'),
      name: 'statisticsRestoreList',
      meta: { title: `${getMenuName()}统计恢复`, icon: 'transactionMgr', breadcrumb: false }
    }
  ]
}
