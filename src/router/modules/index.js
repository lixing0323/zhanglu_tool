import { statisticsMgrRouter } from '@/router/modules/statistics-mgr'
import { statisticsConfigRouter } from '@/router/modules/statistics-config'
import { statisticsRestoreRouter } from '@/router/modules/statistics-restore'
import { loggerMgrRouter } from '@/router/modules/logger-mgr'
import { baseDataShowRouter } from '@/router/modules/base-data-show'
import { dataMgrRouter } from '@/router/modules/base-data-mgr'
import { userMgrRouter } from '@/router/modules/user-mgr'

const asyncRoutes = [
  statisticsMgrRouter,
  statisticsConfigRouter,
  statisticsRestoreRouter,
  baseDataShowRouter,
  loggerMgrRouter,
  dataMgrRouter,
  userMgrRouter
]

export default asyncRoutes
