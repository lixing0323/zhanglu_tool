import { getRandomNumber, CreateDate } from '@/utils/business'
import { parseTime } from '@/utils'

const GROUP_OPTIONS = ['专家用户组', '普通用户组']
const LEVEL_OPTIONS = ['一级', '二级']
export const USER_OPTIONS = ['张三', '李四', '王五', '赵六', '用户1', '用户2', '用户3', '用户4', '新用户']

function getTime(minDay, maxDay) {
  const createTime = new Date(CreateDate)
  const day = 3600 * 24 * 1000
  const max = maxDay * day
  const min = minDay * day
  const now = createTime.getTime()
  createTime.setTime(now + getRandomNumber(min, max))
  return parseTime(createTime, '{y}-{m}-{d} {h}:{i}:{s}')
}

function getItem(i) {
  const username = USER_OPTIONS[i]
  const group = GROUP_OPTIONS[getRandomNumber(0, 1)]
  const code = `2023User000${i + 1}`
  const level = LEVEL_OPTIONS[getRandomNumber(0, 1)]
  // 3天内的时间
  const time = getTime(0, 3)
  return {
    username: username,
    group: group,
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
  data.time = getTime(5, 6)
  return data
}

export const newData = getNewData()
