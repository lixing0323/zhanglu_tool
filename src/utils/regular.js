/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function isValidEmail(email) {
  const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/

  return reg.test(email)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  return typeof str === 'string' || str instanceof String
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

export function isValidCellPhone(phone) {
  const reg = /^1[3456789]\d{9}$/
  return reg.test(phone)
}

export function isValidLinePhone(phone) {
  const reg = /^([0-9-]+)$/
  return reg.test(phone)
}

export function isValidUserName(username) {
  const reg = /^[\w]{4,16}$/
  return reg.test(username)
}

export function isValidPassword(password) {
  const reg = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*?_-]).*$/
  return reg.test(password)
}

export function isValidPasswordLength(password) {
  const reg = /^.{8,20}$/
  return reg.test(password)
}

export function isValidPasswordComplexity(password) {
  const reg = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])/
  return reg.test(password)
}

export function isValidSimplePassword(password) {
  const reg = /^.*(?=.{6,}).*$/
  return reg.test(password)
}
// 中文字符\u4E00 - \u9FA5

export function isValidChinese(chinese) {
  const reg = /^[\u4E00-\u9FA5]+$/
  return reg.test(chinese)
}

export function isValidUnifyCode(unifyCode) {
  const reg = /[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/
  return reg.test(unifyCode)
}

export function isValidIDNumber(idNumber) {
  const reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  return reg.test(idNumber)
}

// 中文 英文 数字 （兼容外国人名）
export function isValidUnionName(unionName) {
  const reg = /^[A-Za-z0-9\u4e00-\u9fa5\s]+$/
  return reg.test(unionName)
}

// 身份证号码
export function isValidIdentityCard(idCard) {
  const reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
  return reg.test(idCard)
}

// 两位浮点数判断
export function isFloatForTwo(number) {
  const reg = /^[0-9]+(\.[0-9]{1,2})?$/
  return reg.test(number)
}

export function isVerifyIdCard(card) {
  // const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  // return reg.test(str)
  // 1 "验证经过!", 0 //校验不经过
  var format = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/
  // 号码规则校验
  if (!format.test(card)) {
    return { 'status': 0, 'msg': '身份证号码不合规' }
  }
  // 区位码校验
  // 出生年月日校验 前正则限制起始年份为1900;
  var year = card.substr(6, 4) // 身份证年
  var month = card.substr(10, 2) // 身份证月
  var date = card.substr(12, 2) // 身份证日
  var time = Date.parse(month + '-' + date + '-' + year) // 身份证日期时间戳date
  var now_time = Date.parse(new Date()) // 当前时间戳
  var dates = (new Date(year, month, 0)).getDate() // 身份证当月天数
  if (time > now_time || date > dates) {
    return { 'status': 0, 'msg': '出生日期不合规' }
  }
  // 校验码判断
  // var c = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2] // 系数
  // var b = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'] // 校验码对照表
  // var id_array = card.split('')
  // var sum = 0
  // for (var k = 0; k < 17; k++) {
  //   sum += parseInt(id_array[k]) * parseInt(c[k])
  // }
  // if (id_array[17].toUpperCase() !== b[sum % 11].toUpperCase()) {
  //   return { 'status': 0, 'msg': '身份证校验码不合规' }
  // }
}

export function isVerifyHKCard(card) {
  // 港澳居民来往内地通行证
  // 规则： H/M + 10位或6位数字
  // 样本： H1234567890
  var reg = /^([A-Z]\d{6,10}(\(\w{1}\))?)$/
  if (reg.test(card) === false) {
    return { 'status': 0, 'msg': '港澳通行证号码不合规' }
  } else {
    return { 'status': 1, 'msg': '校验通过' }
  }
}

export function isVerifyTWCard(card) {
  // 台湾居民来往大陆通行证
  // 规则： 新版8位或18位数字， 旧版10位数字 + 英文字母
  // 样本： 12345678 或 1234567890B
  var reg = /^\d{8}|^[a-zA-Z0-9]{10}|^\d{18}$/
  if (reg.test(card) === false) {
    return { 'status': 0, 'msg': '台胞证号码不合规' }
  } else {
    return { 'status': 1, 'msg': '校验通过' }
  }
}

export function isVerifyPassPortCard(card) {
  // 护照
  // 规则： 14/15开头 + 7位数字, G + 8位数字, P + 7位数字, S/D + 7或8位数字,等
  // 样本： 141234567, G12345678, P1234567
  var reg = /^([a-zA-z]|[0-9]){5,17}$/
  if (reg.test(card) === false) {
    return { 'status': 0, 'msg': '护照号码不合规' }
  } else {
    return { 'status': 1, 'msg': '校验通过' }
  }
}

export function isVerifyString(string) {
  return /[\W]/.test(string)
}

export function isNumber(number) {
  const reg = /^[0-9]*$/
  return reg.test(number)
}

// 统一社会信用代码
export function isUnifyCode(string) {
  const reg = /^([0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}|[1-9]\d{14})$/
  return reg.test(string)
}
