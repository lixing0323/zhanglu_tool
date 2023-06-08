<template>
  <div style="display: inline-block">
    <input ref="fileInputBtn" type="file" style="display: none" name="file-input" :multiple="multipleSelection" :accept="fileAccept" :value="filesValue" @change="onFilesSelected">
    <template v-if="limitedCount > uploadedUrls.length">
      <el-button v-if="!isImgUpload" :type="buttonType" :plain="plain" class="buttonClass" size="mini" :icon="buttonIcon" :loading="isLoading" @click="onFileInputClick">{{ buttonTitle }}</el-button>
      <a v-else :loading="isLoading" @click="onFileInputClick"><img :src="require('@/assets/uploadImg.png')" style="width: 100px;height: 100px;"></a>
    </template>
  </div>
</template>

<script>
import { getUrl, upload } from '@/utils/minio'
import { getCosFileUrl, getImageUrl, sliceUploadFile, sliceUploadFiles } from '@/utils/cos'
import { FILE_ACCEPT, filenameWithTimestamp } from '@/utils'

const MAX_FILE_SIZE = 1024 * 1024 * 10

export default {
  name: 'HtUploadButton',
  components: { },
  props: {
    fileType: {
      type: Array,
      // ['image']需要单独写
      default: () => { return ['image'] },
      validator(arr) {
        const tempArr = arr.filter(item => {
          return ['image', 'doc', 'pdf', 'video', 'excel', 'powerpoint', 'txt', 'zip', 'security', 'all'].includes(item)
        })
        return tempArr.length === arr.length
      }
    },
    keyPrefix: {
      type: String,
      default: null
    },
    initContext: {
      type: [Object, String],
      default: null
    },
    buttonType: {
      type: String,
      default: 'primary'
    },
    buttonTitle: {
      type: String,
      default: '上传'
    },
    buttonIcon: {
      type: String,
      default: 'el-icon-upload'
    },
    buttonClass: {
      type: String,
      default: 'blue-button-style'
    },
    multipleSelection: {
      type: Boolean,
      default: false
    },
    showSuccessTip: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    uploadTemp: {
      type: Boolean,
      default: false
    },
    isDCloudMode: {
      type: Boolean,
      default: false
    },
    limitedCount: {
      type: Number,
      default: 999
    },
    uploadedUrls: {
      type: Array,
      default: () => { return [] }
    },
    isImgUpload: {
      type: Boolean,
      default: false
    },
    needFile: {
      type: Boolean,
      default: false
    },
    plain: {
      type: Boolean,
      default: false
    },
    minWidth: {
      type: Number,
      default: undefined
    },
    minHeight: {
      type: Number,
      default: undefined
    },
    maxWidth: {
      type: Number,
      default: undefined
    },
    maxHeight: {
      type: Number,
      default: undefined
    },
    width: {
      type: Number,
      default: undefined
    },
    height: {
      type: Number,
      default: undefined
    },
    isOriginalName: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      context: this.initContext,
      isLoading: false,
      filesValue: '',
      files: [],
      percentage: 0,
      uploadCount: 0,
      errCount: 0,
      successCount: 0
    }
  },
  computed: {
    fileAccept() {
      let acceptType = ''
      this.fileType.forEach(item => {
        acceptType = acceptType + (FILE_ACCEPT[item])
      })
      return acceptType
    },
    formattedPercentage() {
      return this.percentage >= 100 ? '上传完成' : `${this.percentage}%`
    }
  },
  watch: {
    successCount(val) {
      if (val) {
        this.checkFinishedOnDCloud()
      }
    },
    errCount(val) {
      if (val) {
        this.checkFinishedOnDCloud()
      }
    }
  },
  methods: {
    setContext(context) {
      this.context = context
    },
    onFileInputClick() {
      this.filesValue = ''
      this.$refs.fileInputBtn.value = null
      this.$nextTick(() => {
        this.$refs.fileInputBtn.click()
      })
    },
    beginUpload(length = 0) {
      // 需要上传的文件总数，错误文件数，成功文件数
      this.uploadCount = length
      this.errCount = 0
      this.successCount = 0
      this.files = []
      // loading
      this.isLoading = true
      this.$emit('on-upload-start')
      this.$emit('on-upload-progress', 1, 0)
    },
    afterUploaded() {
      this.isLoading = false
      this.$emit('on-upload-progress', 0, 0)
      this.$emit('on-upload-finish')
    },
    onUploadProgress(percent, speed) {
      this.$emit('on-upload-progress', percent, speed)
    },
    async onFilesSelected(ev) {
      ev.preventDefault()
      if (this.multipleSelection) {
        const filesCount = ev.target.files.length + this.uploadedUrls.length
        if (filesCount > this.limitedCount) {
          this.$message({ message: `文件数量不能超过${this.limitedCount}个`, duration: 1500, type: 'warning' })
          return
        }
        this.onUploadFiles(ev.target.files)
      } else {
        const file = ev.target.files[0]
        if (file.size >= MAX_FILE_SIZE) {
          this.$message({ message: `文件大小不能超过${MAX_FILE_SIZE / 1024 / 1024}MB`, duration: 1500, type: 'warning' })
          return false
        }
        if (this.isImgUpload && (this.width || this.height)) {
          // 获取上传图片的宽高
          const fr = new FileReader()
          const image = new Image()
          image.onload = (e) => {
            image.src = e.path ? e.path[0] : undefined
            if (this.width && this.height && (image.width !== this.width || image.height !== this.height)) {
              this.$message({ message: `请上传宽度为${this.width}，高度为${this.height}的图片`, duration: 1500, type: 'warning' })
              return false
            } else if (this.height && image.height !== this.height) {
              this.$message({ message: `请上传高度为${this.height}的图片`, duration: 1500, type: 'warning' })
              return false
            } else if (this.width && image.width !== this.width) {
              this.$message({ message: `请上传宽度为${this.width}的图片`, duration: 1500, type: 'warning' })
              return false
            } else {
              if (this.needFile) {
                this.$emit('on-picker', ev.target.files[0])
              } else {
                this.onUploadFiles(ev.target.files)
              }
            }
          }
          fr.onload = (e) => {
            image.src = e.target.result
          }
          fr.readAsDataURL(file)
        } else {
          if (this.needFile) {
            this.$emit('on-picker', ev.target.files[0])
          } else {
            this.onUploadFiles(ev.target.files)
          }
        }
      }
    },
    onUploadSingleFile(file) {
      this.beginUpload()
      const fileUpload = { key: this.getKey(file), body: file }
      sliceUploadFile(fileUpload, null, this.onUploadProgress,
        (err, data) => {
          if (!err) {
            if (this.showSuccessTip) {
              this.$message({ message: `上传成功`, duration: 1500, type: 'success' })
            }
            const fileUrl = this.fileType.toString() === ['image'].toString() ? getImageUrl(data) : getCosFileUrl(data)
            this.$emit('on-file-uploaded', fileUrl)
          } else {
            this.$message({ message: `上传失败: ${err.error}`, duration: 1500, type: 'error' })
          }
          this.afterUploaded()
        })
    },
    onUploadFiles(filesToUpload) {
      if (this.isDCloudMode) {
        this.useDCloud(filesToUpload)
      } else {
        this.useCos(filesToUpload)
      }
    },
    // 使用DCloud方式上传
    useDCloud(filesToUpload) {
      const length = filesToUpload.length
      this.beginUpload(length)
      for (let i = 0; i < length; i++) {
        const file = filesToUpload[i]
        getUrl(file, this.keyPrefix).then(a => {
          upload(file, a, this.progressOnDCloud).then(b => {
            this.files.push(b)
            this.successCount++
          }).catch(() => (this.errCount++))
        }).catch(() => (this.errCount++))
      }
    },
    // 使用cos方式上传
    useCos(filesToUpload) {
      this.beginUpload()
      const files = []
      // eslint-disable-next-line no-unused-vars
      for (const file of filesToUpload) {
        files.push({ key: this.getKey(file), body: file })
      }
      sliceUploadFiles(files, null, this.onUploadProgress,
        (err, data) => {
          if (!err) {
            const urls = []
            data.files.forEach(item => {
              urls.push(this.fileType.toString() === ['image'].toString() ? getImageUrl(item) : getCosFileUrl(item))
            })
            this.$emit('on-files-uploaded', urls)
          } else {
            this.$message({ message: `上传失败: ${err.error}`, duration: 1500, type: 'error' })
          }
          this.afterUploaded()
        })
    },
    // 上传进度
    progressOnDCloud(progressEvent) {
      const progress = ((progressEvent.loaded * 100) / progressEvent.total).toFixed(2)
      this.$emit('on-upload-progress', progress)
    },
    checkFinishedOnDCloud() {
      if (this.isDCloudMode && this.errCount + this.successCount === this.uploadCount) {
        const type = this.successCount === 0 ? 'error' : 'success'
        this.$message({ message: `文件上传完成，成功 ${this.successCount} 个, 失败 ${this.errCount} 个`,
          duration: 2000, type: type })
        this.$emit('on-files-uploaded', this.files)
        this.afterUploaded()
      }
    },
    getKey(file) {
      const name = this.isOriginalName ? file.name : filenameWithTimestamp(file.name, this.uploadTemp)
      return `${this.keyPrefix}/${name}`
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
