import defaultSettings from '@/settings'

export const CreateDate = '2023/03/26 16:01:24'

export function getMenuName() {
  const title = defaultSettings.title
  const length = title.length
  return title.substr(0, length - 2)
}

export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

