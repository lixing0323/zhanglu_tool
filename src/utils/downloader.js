import axios from 'axios'
import { Message } from 'element-ui'
const downloader = (url, fName, callback = null) => {
  const reqUrl = url
  let req = null
  req = axios.get(reqUrl, { responseType: 'blob' })
  req.then(response => {
    if (callback) {
      callback()
    }
    if (response.status === 0) {
      Message({
        message: response.errMsg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
    } else {
      const fileName = fName
      const blob = new Blob([response.data])
      const downloadElement = document.createElement('a')
      const href = window.URL.createObjectURL(blob) // 创建下载的链接
      downloadElement.href = href
      downloadElement.download = fileName // 下载后文件名
      document.body.appendChild(downloadElement)
      downloadElement.click() // 点击下载
      document.body.removeChild(downloadElement) // 下载完成移除元素
      window.URL.revokeObjectURL(href) // 释放掉blob对象
    }
  })
    .catch(function(error) {
      if (callback) {
        callback()
      }
      Message({
        message: error.message,
        type: 'error',
        duration: 3 * 1000
      })
    })
}

export default downloader
