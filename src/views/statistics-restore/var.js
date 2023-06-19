import { getRandomNumber } from '@/utils/business'

function getItem(i) {
  const name = `名称${i + 1}`
  const method = `方式${getRandomNumber(1, 6)}`
  const type = `类型${getRandomNumber(1, 6)}`
  const file = getRandomNumber(1, 3)
  return {
    id: i,
    name: name,
    method: method,
    type: type,
    file: file
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
