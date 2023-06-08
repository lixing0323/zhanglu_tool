import { CreateDate, getRandomNumber } from '@/utils/business'
import { parseTime } from '@/utils'

const NAME_OPTIONS = ['A', 'B', 'C', 'D']
const PARAMS = ['a', 'b', 'c', 'd', 'e', 'f']
const LEVEL = ['1级', '2级', '3级']

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
  const letter = NAME_OPTIONS[getRandomNumber(0, 3)]
  const name = `${letter}-${getRandomNumber(11, 20)}型`
  const level = LEVEL[getRandomNumber(0, 2)]
  const date = parseTime(getTime(3, 5), '{y}-{m}-{d}')
  const code = `${parseTime(date, '{y}{m}{d}')}${letter}000000${i + 1}`
  const startTime = getTime(6, 7)
  const endTime = getTime(9, 10)
  const mode = `模式${getRandomNumber(1, 6)}`
  const params = PARAMS[getRandomNumber(0, 5)]
  const method = `方式${getRandomNumber(1, 6)}`

  return {
    id: i,
    name: name,
    code: code,
    level: level,
    params: params,
    date: date,
    startTime: startTime,
    endTime: endTime,
    mode: mode,
    method: method
  }
}

export function getList() {
  const list = []
  for (let i = 0; i < 8; i++) {
    list.push(getItem(i))
  }
  return list.sort((a, b) => {
    const aTime = new Date(a.date)
    const bTime = new Date(b.date)
    return aTime.getTime() - bTime.getTime()
  })
}

function getNewData() {
  const data = getItem(8)
  data.date = getTime(11, 12)
  data.startTime = getTime(13, 15)
  data.endTime = getTime(16, 17)
  return data
}

export const newData = getNewData()
