import { getRandomNumber } from '@/utils/business'

const TYPE_OPTIONS = ['大型', '中型', '小型']

function getType(volume) {
  let type
  if (volume >= 10000 && volume < 40000) {
    type = TYPE_OPTIONS[2]
  } else if (volume >= 40000 && volume < 60000) {
    type = TYPE_OPTIONS[1]
  } else {
    type = TYPE_OPTIONS[0]
  }
  return type
}

function getItem(i) {
  const name = `名称${i + 1}`
  const introduce = `统计管理数据${i + 1}`
  const volume = getRandomNumber(10000, 99999)
  const category = `分类${getRandomNumber(1, 5)}`
  const time = `${getRandomNumber(5, 20)}小时${getRandomNumber(10, 50)}分${getRandomNumber(10, 50)}秒`
  const type = getType(volume)
  const comment = `${type}管理数据`

  return {
    id: i,
    name: name,
    introduce: introduce,
    volume: volume,
    time: time,
    category: category,
    type: type,
    comment: comment
  }
}

export function getList() {
  const list = []
  for (let i = 0; i < 6; i++) {
    list.push(getItem(i))
  }
  return list
}

function getNewData() {
  return getItem(6)
}

export const newData = getNewData()
