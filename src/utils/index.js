import axios from 'axios'
import JSZip from 'jszip'
import FileSaver from 'file-saver'
const Big = require('big.js')
/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength(str) {
  // returns the byte length of an utf8 string
  let s = str.length
  for (var i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) s++
    else if (code > 0x7ff && code <= 0xffff) s += 2
    if (code >= 0xDC00 && code <= 0xDFFF) i--
  }
  return s
}

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function param(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}

/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

/**
 * @returns {string}
 */
export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

export const FILE_ACCEPT = {
  image: 'image/jpeg, image/x-png, image/x-ms-bmp, image/png',
  doc: 'application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, .doc, .pdf, .docx',
  pdf: '.pdf',
  video: 'video/mp4,video/x-m4v,video/*',
  excel: 'application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, .xlsx, .xls, ',
  powerpoint: 'application/vnd.ms-powerpoint, ',
  txt: 'text/plain, text/csv, text/plain, .txt',
  zip: 'application/zip, .zip, .rar, application/x-rar-compressed ,application/x-zip-compressed',
  security:
    'image/jpeg, image/x-png, image/x-ms-bmp ' +
    'application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, ' +
    'application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation, ' +
    'application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, ' +
    'text/plain, text/csv, ' +
    'video/mp4,video/x-m4v,video/*, ' +
    '.xlsx, .xls, ' +
    '.doc, .pdf, .docx, ' +
    'application/zip, .zip, .rar, application/x-rar-compressed ,application/x-zip-compressed',
  all: '*.*'
}

export function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

export function filterSystemChars(fileName) {
  const result = fileName
  return result && result.replace(/[&\|\\\*\[\]\{\}\`\~\<\>\?\:\(\)\"\+\=\,\!\/\^\s%$#@\-]/g, '')
}

export function filenameWithTimestamp(originFileName) {
  const filename = filterSystemChars(originFileName)
  const timestamp = parseTime(new Date(), '{y}{m}{d}{h}{i}{s}')
  const randomNum = getRandomNum(1111, 9999)
  const dotPos = filename.lastIndexOf('.')
  const name = filename.substr(0, dotPos)
  const suffix = filename.substr(dotPos, filename.length - dotPos)
  return `${name}_${timestamp}${randomNum}${suffix}`
}

export function queryParser(listQuery, query, numberKeys = []) {
  Object.keys(listQuery).forEach(key => {
    if (query[key] !== undefined && query[key] !== '') {
      if (key === 'page' || key === 'perPage') {
        listQuery[key] = parseInt(query[key])
      } else if (numberKeys.indexOf(key) !== -1) {
        listQuery[key] = parseInt(query[key])
      } else {
        listQuery[key] = query[key]
      }
    }
  })
}

export function jsonToMsg(data) {
  let msg = ''
  Object.keys(data).forEach(key => {
    msg += `${key}: `
  })
  return msg
}

// 下载文件
export function downloadFile(name, src, isDownload = true) {
  if (isDownload) {
    const x = new XMLHttpRequest()
    x.open('GET', src, true)
    x.responseType = 'blob'
    x.onload = function(e) {
      const url = window.URL.createObjectURL(x.response)
      const a = document.createElement('a')
      a.href = url
      a.download = name
      a.click()
    }
    x.send()
  } else {
    // 创建隐藏的可下载链接
    const eleLink = document.createElement('a')
    eleLink.download = src
    eleLink.style.display = 'none'
    // 字符内容转变成blob地址
    eleLink.href = src
    // 触发点击
    document.body.appendChild(eleLink)
    eleLink.click()
    // 然后移除
    document.body.removeChild(eleLink)
  }
}

// 计算浮点数之差
export function getSubtractionOfFloat(a, b) {
  a = arguments[0] ? arguments[0] : 0
  b = arguments[1] ? arguments[1] : 0
  const x = new Big(a)
  return Number(x.minus(b))
}

// 计算浮点数之和
export function getAdditionOfFloat(a, b) {
  a = arguments[0] ? arguments[0] : 0
  b = arguments[1] ? arguments[1] : 0
  const x = new Big(a)
  return Number(x.plus(b))
}

// 计算浮点数之乘法
export function getMultiplicationOfFloat(a, b) {
  a = arguments[0] ? arguments[0] : 0
  b = arguments[1] ? arguments[1] : 0
  const x = new Big(a)
  return Number(x.times(b))
}

// 计算浮点数之除法
export function getDivisionOfFloat(a, b) {
  a = arguments[0] ? arguments[0] : 0
  b = arguments[1] ? arguments[1] : 1
  const x = new Big(a)
  return Number(x.div(b))
}

// 批量下载
export function getQRCodeFile(url) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url,
      responseType: 'arraybuffer'
    }).then(data => {
      resolve(data.data)
    }).catch(error => {
      reject(error.toString())
    })
  })
}
// 批量下载
export function handleBatchDownload(data, fileName) {
  const zip = new JSZip()
  const cache = {}
  const promises = []
  data.forEach(item => {
    const promise = getQRCodeFile(item.img).then(data => { // 下载文件, 并存成ArrayBuffer对象
      const file_name = `${item.name}.png` // 获取文件名
      // if (file_name.indexOf('.png') == -1) {
      //    file_name = file_name + '.png'
      // }
      zip.file(file_name, data, {
        binary: true
      }) // 逐个添加文件
      cache[file_name] = data
    })
    promises.push(promise)
  })
  Promise.all(promises).then(() => {
    zip.generateAsync({
      type: 'blob'
    }).then(content => { // 生成二进制流
      FileSaver.saveAs(content, `${fileName}.zip`) // 利用file-saver保存文件
    })
  })
}

export function translateDate(month) {
  const monthObj = {
    January: '一月',
    February: '二月',
    March: '三月',
    April: '四月',
    May: '五月',
    June: '六月',
    July: '七月',
    August: '八月',
    September: '九月',
    October: '十月',
    November: '十一月',
    December: '十二月'
  }

  return monthObj[month]
}

export function initTime() {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const day = now.getDate()
  const start = new Date(year, month, 1, 0, 0, 0)
  const end = new Date(year, month, day, 23, 59, 59)

  const x1 = parseTime(start)
  const x2 = parseTime(end)

  return [x1, x2]
}

export function initNowTime() {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const day = now.getDate()
  const hour = now.getHours()
  const minute = now.getMinutes()
  // const second = now.getSeconds()
  const time = new Date(year, month, day, hour, minute)
  return parseTime(time)
}

// 去除字符串前后空格
export function deleteSpaceStartAndEnd(val) {
  return val.replace(/(^\s*)|(\s*$)/g, '')
}

export function difDayValue(day1, day2) {
  const d1 = new Date(day1)
  const d2 = new Date(day2)
  return (d2 - d1) / (1000 * 60 * 60 * 24) + 1
}

// 把时间转换为秒
export function makeDurationToSeconds(time) {
  const str = time
  const arr = str.split(':')
  const hs = arr[0] ? parseInt(arr[0] * 3600) : 0
  const ms = arr[1] ? parseInt(arr[1] * 60) : 0
  const ss = arr[2] ? parseInt(arr[2]) : 0
  const seconds = hs + ms + ss
  return seconds
}

// 比较时间
export function compareDateUtils(d1, d2) {
  const date1 = new Date(Date.parse(d1))
  const date2 = new Date(Date.parse(d2))
  return date1 > date2
}

// jsonpath处理嵌套数据结构
export function extractValue(row, field) {
  const jsonpath = require('jsonpath')
  const data = jsonpath.query(row, `$.${field}`)
  return data[0] || '-'
}

export function getRoundMoney(num, n) {
  var f = parseFloat(num)
  if (isNaN(f)) {
    return false
  }
  f = Math.round(num * Math.pow(10, n)) / Math.pow(10, n)
  var s = f.toString()
  var rs = s.indexOf('.')
  if (rs < 0) {
    rs = s.length
    s += '.'
  }
  while (s.length <= rs + n) {
    s += '0'
  }
  return s
}

export const chunk = (arr, size) => {
  if (!arr.length || size < 1) return []
  const list = []; let index = 0; let resIndex = 0; const len = arr.length
  while (index < len) {
    list[resIndex++] = arr.slice(index, index += size)
  }
  return list
}

// 数字转换为中文大写
export function digitUppercase(num) {
  if (typeof num === 'number') {
    num = String(num)
  }
  if (isNaN(num)) { // 验证输入的字符是否为数字
    return '零元整'
  } else {
    const fraction = ['角', '分']
    const digit = [
      '零', '壹', '贰', '叁', '肆',
      '伍', '陆', '柒', '捌', '玖'
    ]
    const unit = [
      ['元', '万', '亿'],
      ['', '拾', '佰', '仟']
    ]
    num = Math.abs(num)
    let s = ''
    for (let i = 0; i < fraction.length; i++) {
      s += (digit[Math.floor(num * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '')
    }
    s = s || '整'
    num = Math.floor(num)
    for (let i = 0; i < unit[0].length && num > 0; i++) {
      let p = ''
      for (let j = 0; j < unit[1].length && num > 0; j++) {
        p = digit[num % 10] + unit[1][j] + p
        num = Math.floor(num / 10)
      }
      s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
    }
    return s.replace(/(零.)*零元/, '元')
      .replace(/(零.)+/g, '零')
      .replace(/^整$/, '零元整')
  }
}

export function getTimeDefaultNow(time) {
  return parseTime(time || new Date(), '{y}-{m}-{d} {h}:{i}:{s}')
}
