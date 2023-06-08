import { getMinioUrl } from '@/api-js/minio'
import axios from 'axios'
import { filenameWithTimestamp } from '@/utils/index'

const BucketName = 'testdata'

// 获取minio 上传的地址url
export function getUrl(file, keyPrefix) {
  return new Promise((resolve, reject) => {
    getMinioUrl(BucketName, `${keyPrefix}/${filenameWithTimestamp(file.name)}`)
      .then((res) => resolve(res)).catch(() => reject())
  })
}
// 上传
export function upload(file, res, callback) {
  return new Promise((resolve, reject) => {
    axios.put(res.uploadUrl, file, { headers: { 'Content-Type': file.type }, onUploadProgress: callback })
      .then(p => resolve(res.accessUrl)).catch(() => (reject()))
  })
}
