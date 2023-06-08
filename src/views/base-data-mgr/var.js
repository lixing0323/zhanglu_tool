import { CreateDate, getRandomNumber } from '@/utils/business'
import { USER_OPTIONS } from '@/views/user-mgr/var'
import { parseTime } from '@/utils'

const NAME_OPTIONS = ['A', 'B', 'C', 'D']
const LEVEL_OPTIONS = ['一级', '二级']

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
  const name = `${NAME_OPTIONS[getRandomNumber(0, 3)]}-${getRandomNumber(100000, 999999)}类`
  const level = LEVEL_OPTIONS[getRandomNumber(0, 1)]
  const username = USER_OPTIONS[i]
  const code = getRandomNumber(10000, 99999)
  const time = getTime(7, 10)
  return {
    id: i,
    name: name,
    username: username,
    code: code,
    level: level,
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
