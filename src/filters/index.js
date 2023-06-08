import { COS_IMAGE_PREFIX } from '@/utils/cos'
import accounting from 'accounting'
import { getDivisionOfFloat, parseTime, getRoundMoney, getMultiplicationOfFloat } from '@/utils'

const CURRENCY_TYPE = {
  CNY: { symbol: '¥', name: '人民币' },
  USD: { symbol: '$', name: '美元' }
}

/**
 * Show plural label if time is plural number
 * @param {number} time
 * @param {string} label
 * @return {string}
 */
function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

/**
 * @param {number} time
 */
export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/**
 * Number formatting
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function numberFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function originFilenameOfUrl(url) {
  const decodedUrl = safeDecodeURI(url)
  const filename = filenameOfUrl(decodedUrl)
  const dotPos = filename.lastIndexOf('.')
  let name = filename.substr(0, dotPos)
  const suffix = filename.substr(dotPos, filename.length - dotPos)
  const underlinePos = name.lastIndexOf('_')
  if (underlinePos !== -1) {
    name = name.substr(0, underlinePos)
    return `${name}${suffix}`
  } else {
    return filename
  }
}

export function safeDecodeURI(url) {
  let decodedUrl = ''
  try {
    decodedUrl = decodeURI(url)
  } catch (e) {
    decodedUrl = url
  }
  return decodedUrl
}

export function filenameOfUrl(url) {
  const decodedUrl = safeDecodeURI(url)
  const lastSlash = decodedUrl.lastIndexOf('/') + 1
  return decodedUrl.substr(lastSlash, url.length - lastSlash)
}

export function quantityStepToPrecision(quantityStep) {
  let precision = 0
  switch (quantityStep) {
    case 0:
      precision = 0
      break
    case 0.001:
      precision = 3
      break
    case 0.01:
      precision = 2
      break
    case 0.1:
      precision = 1
      break
    case 1:
      precision = 0
      break
  }
  return precision
}

export function machineNumberToHuman(number) {
  if (typeof number === 'number') {
    return number + 1
  } else {
    return 0
  }
}

export function cosSizeIn(url, w, h) {
  if (w === undefined || w === null || w === 0) {
    w = 1600
  }
  if (h === undefined || h === null || h === 0) {
    h = 900
  }
  return `${url}${COS_IMAGE_PREFIX}/2/w/${w}/h/${h}`
}

export function tableThumbnail(url) {
  return cosSizeIn(url, 32, 18)
}

export function formatMoney(price, type = 'CNY', n = 2, precision = 2) {
  if (price === 0 || price === undefined || price === null) {
    return `${CURRENCY_TYPE[type].symbol} 0`
  }
  return price ? accounting.formatMoney(getRoundMoney(price, n), `${CURRENCY_TYPE[type].symbol} `, precision, ',', '.') : ''
}

// 只要金额的数组，不要符号
export function formatMoneyNum(money, type = 'CNY', n = 2, precision = 2) {
  return formatMoney(money, type, n, precision).substr(1)
}

export function formatTime(time) {
  if (time) {
    return parseTime(time, '{y}-{m}-{d} {h}:{i}:{s}')
  }
}

export function changeToWan(money) {
  return getDivisionOfFloat(money, 10000)
}

export function changeToYuan(money) {
  return getMultiplicationOfFloat(money, 10000)
}
