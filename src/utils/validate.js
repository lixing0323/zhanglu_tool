import {
  isFloatForTwo,
  isNumber,
  isUnifyCode,
  isVerifyIdCard,
  isVerifyHKCard,
  isVerifyPassPortCard, isValidCellPhone
} from '@/utils/regular'

export const validateFloat = (rule, value, callback) => {
  if (!isFloatForTwo(value)) {
    callback(new Error('请输入数字，小数点后最多两位数字'))
  } else {
    callback()
  }
}

export const validateNumGreaterThanZero = (rule, value, callback) => {
  if (value <= 0) {
    callback(new Error('请输入大于0的数字'))
  } else {
    callback()
  }
}

export const validateNumber = (rule, value, callback) => {
  if (!isNumber(value)) {
    callback(new Error('请输入整数'))
  } else {
    callback()
  }
}

export const validateIdCardNo = (rule, value, callback) => {
  if (value) {
    if (isVerifyIdCard(value)) {
      if (!isVerifyIdCard(value).status) {
        callback(new Error(isVerifyIdCard(value).msg))
      } else {
        callback()
      }
    } else {
      callback()
    }
  } else {
    callback()
  }
}

export const verifyHKCard = (rule, value, callback) => {
  if (!isVerifyHKCard(value).status) {
    callback(new Error(isVerifyHKCard(value).msg))
  } else {
    callback()
  }
}

export const verifyPassPortCard = (rule, value, callback) => {
  if (!isVerifyPassPortCard(value).status) {
    callback(new Error(isVerifyPassPortCard(value).msg))
  } else {
    callback()
  }
}

// const verifyTWCard = (rule, value, callback) => {
//   if (!isVerifyTWCard(value).status) {
//     callback(new Error(isVerifyTWCard(value).msg))
//   } else {
//     callback()
//   }
// }

export const verifyUnifyCode = (rule, value, callback) => {
  if (!isUnifyCode(value)) {
    callback(new Error('请输入正确的统一社会信用代码'))
  } else {
    callback()
  }
}

export const validateCellPhone = (rule, value, callback) => {
  if (!isValidCellPhone(value) && value) {
    callback(new Error('手机号码格式错误'))
  } else {
    callback()
  }
}

export function isValidPasswordLength(password) {
  const reg = /^.{8,20}$/
  return reg.test(password)
}

export function isValidPasswordComplexity(password) {
  const reg = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])/
  return reg.test(password)
}

export function isValidUserName(username) {
  const reg = /^[\w]{4,16}$/
  return reg.test(username)
}
