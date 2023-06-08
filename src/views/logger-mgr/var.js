export const listData = [
  { id: 1, username: '张三', time: '2023/03/05', record: '删除', optCount: '3次', type: '日志', arriveCount: '5次' },
  { id: 2, username: '李四', time: '2023/03/05', record: '查看', optCount: '1次', type: '日志', arriveCount: '1次' },
  { id: 3, username: '王五', time: '2023/03/06', record: '查看', optCount: '1次', type: '日志', arriveCount: '2次' },
  { id: 4, username: '赵六', time: '2023/03/06', record: '查看', optCount: '1次', type: '日志', arriveCount: '3次' },
  { id: 5, username: 'user1', time: '2023/03/06', record: '查看', optCount: '2次', type: '日志', arriveCount: '3次' },
  { id: 6, username: 'user2', time: '2023/03/07', record: '编辑', optCount: '2次', type: '日志', arriveCount: '4次' },
  { id: 7, username: 'user3', time: '2023/03/08', record: '编辑', optCount: '2次', type: '日志', arriveCount: '5次' },
  { id: 8, username: 'user4', time: '2023/03/08', record: '查看', optCount: '2次', type: '日志', arriveCount: '3次' }
]

import { CreateDate, getRandomNumber } from '@/utils/business'
import { USER_OPTIONS } from '@/views/user-mgr/var'
import { parseTime } from '@/utils'

const NAME_OPTIONS = ['A', 'B', 'C', 'D']
const LEVEL_OPTIONS = ['一级', '二级']
const RECORD_OPTIONS = ['查看', '编辑', '删除']

function getTime(minDay, maxDay) {
  const createTime = new Date(CreateDate)
  // 5天后的4天内的随机时间
  const day = 3600 * 24 * 1000
  const max = maxDay * day
  const min = minDay * day
  const now = createTime.getTime()
  createTime.setTime(now + getRandomNumber(min, max))
  return parseTime(createTime, '{y}-{m}-{d} {h}:{i}:{s}')
}

function getItem(i) {
  const record = RECORD_OPTIONS[getRandomNumber(0, 2)]
  const type = '日志'
  const username = USER_OPTIONS[i]
  const optCount = `${getRandomNumber(1, 3)}次`
  const time = getTime(7, 10)
  const arriveCount = `${getRandomNumber(4, 6)}次`
  return {
    id: i,
    record: record,
    username: username,
    optCount: optCount,
    type: type,
    arriveCount: arriveCount,
    time: time
  }
}

export function getList() {
  const list = []
  for (let i = 0; i < 8; i++) {
    list.push(getItem(i))
  }
  return list.sort((a, b) => {
    const aTime = new Date(a.time)
    const bTime = new Date(b.time)
    return aTime.getTime() - bTime.getTime()
  })
}

function getNewData() {
  const data = getItem(8)
  data.time = getTime(11, 12)
  return data
}

export const newData = getNewData()

