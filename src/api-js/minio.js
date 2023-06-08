import { request } from '@/utils/request'

export function getMinioUrl(catalogueName, pathName) {
  return request({
    url: 'outer-apis/minio/presigned-url',
    method: 'post',
    data: { bucketName: catalogueName, objectName: pathName }
  })
}
