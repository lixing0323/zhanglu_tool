import COS from 'cos-js-sdk-v5'

export const COS_IMAGE_PREFIX = '?imageView2'

// export const cos = new COS({
//   getAuthorization: (options, callback) => {
//     apiClient.outerApis.getQCloudStsCos((options.Method || 'get').toLowerCase(), '/' + (options.Key || ''))
//       .then(response => {
//         console.log(response, 333)
//         callback(response.credentials)
//       }).catch(() => {
//         callback('error')
//       })
//   }
// })
// const getAuthorization = function(options, callback) {
//   getAuthorization().then(response => {
//     const data = response
//     const credentials = data && data.credentials
//     if (!data || !credentials) return console.error('credentials invalid')
//     callback({
//       TmpSecretId: credentials.tmpSecretId,
//       TmpSecretKey: credentials.tmpSecretKey,
//       XCosSecurityToken: credentials.sessionToken,
//       StartTime: data.startTime, // 时间戳，单位秒，如：1580000000，建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
//       ExpiredTime: data.expiredTime // 时间戳，单位秒，如：1580000900
//     })
//   }).catch(() => {
//     callback('error')
//   })
// }

// 初始化实例
const cos = new COS({
  // path style 指正式请求时，Bucket 是在 path 里，这样用相同园区多个 bucket 只需要配置一个园区域名
  // ForcePathStyle: true,
  SecretId: 'AKIDRnwq8dHD6kZAXfaDgz6lAIlz5vWqmYdJ',
  SecretKey: 'qheOB71hWTeiWRXxNyOoxsjT2TghRzIJ'
  // 是否使用全球加速域名。开启该配置后仅以下接口支持操作：putObject、getObject、headObject、optionsObject、multipartInit、multipartListPart、multipartUpload、multipartAbort、multipartComplete、multipartList、sliceUploadFile、uploadFiles
  // UseAccelerate: true,
})

export function fileToBase64Async(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e) => {
      resolve(e.target.result)
    }
  })
}

export function Base64ToBlob(urlData) {
  // 去掉url的头，并转换为byte
  const bytes = window.atob(urlData.split(',')[1])

  // 处理异常,将ascii码小于0的转换为大于0
  const ab = new ArrayBuffer(bytes.length)
  const ia = new Uint8Array(ab)
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i)
  }
  return new Blob([ab], {
    type: 'image/png'
  })
}

export function sliceUploadFile(file, onTaskReady = null, onProgress = null, callback = null) {
  cos.sliceUploadFile({
    Bucket: process.env.VUE_APP_COS_BUCKET,
    Region: process.env.VUE_APP_COS_REGION,
    Key: file.key,
    Body: file.body,
    onTaskReady: function(tid) {
      onTaskReady && onTaskReady(tid)
    },
    onProgress: function(info) {
      const percent = Number(info.percent * 10000 / 100).toFixed(0)
      const speed = (info.speed / 1024 / 1024 * 100) / 100
      onProgress && onProgress(percent, speed)
    }
  }, function(err, data) {
    callback && callback(err, data)
  })
}

export function sliceUploadFiles(files, onTaskReady = null, onProgress = null, callback = null) {
  const cosFiles = []
  // eslint-disable-next-line no-unused-vars
  for (const file of files) {
    cosFiles.push({
      Bucket: process.env.VUE_APP_COS_BUCKET,
      Region: process.env.VUE_APP_COS_REGION,
      Key: file.key,
      Body: file.body
    })
  }
  cos.uploadFiles({
    files: cosFiles,
    onTaskReady: function(tid) {
      onTaskReady && onTaskReady(tid)
    },
    onProgress: function(info) {
      const percent = Number(info.percent * 10000 / 100).toFixed(0)
      const speed = (info.speed / 1024 / 1024 * 100) / 100
      onProgress && onProgress(percent, speed)
    }
  }, function(err, data) {
    callback && callback(err, data)
  })
}

export function putObject(key, content, callback = null) {
  cos.putObject({
    Bucket: process.env.VUE_APP_COS_BUCKET,
    Region: process.env.VUE_APP_COS_REGION,
    Key: key,
    Body: content
  }, function(err, data) {
    callback && callback(err, data)
  })
}

export function getObject(key, callback = null) {
  cos.getObject({
    Bucket: process.env.VUE_APP_COS_BUCKET,
    Region: process.env.VUE_APP_COS_REGION,
    Key: key
  }, function(err, data) {
    callback && callback(err, data)
  })
}

export function getImageUrl(cosRespObj) {
  if (cosRespObj.Key === undefined) {
    return `${process.env.VUE_APP_COS_SERVER}${cosRespObj.options.Key}`
  } else {
    return `${process.env.VUE_APP_COS_SERVER}${cosRespObj.Key}`
  }
}

export function getCosFileUrl(cosRespObj) {
  if (cosRespObj.data !== undefined) {
    return `https://${cosRespObj.data.Location}`
  } else {
    return `https://${cosRespObj.Location}`
  }
}

export function getCosFileKeyByUrl(cosFileUrl) {
  const url = new URL(cosFileUrl)
  return url.pathname.substring(1)
}
