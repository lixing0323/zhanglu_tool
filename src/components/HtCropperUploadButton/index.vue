<template>
  <div style="display: inline-block">
    <div style="display: inline-block">
      <input
        ref="fileInputBtn"
        type="file"
        style="display: none"
        name="file-input"
        :multiple="false"
        :accept="fileAccept"
        :value="filesValue"
        @change="onFilesSelected"
      >
      <el-button
        v-if="!isImgUpload"
        color="#035FD2"
        :type="buttonType"
        :icon="buttonIcon || 'upload'"
        :plain="plain"
        @click="onFileInputClick"
      >{{ buttonTitle }}
      </el-button>
      <a v-else @click="onFileInputClick">
        <img
          :src="require('@/assets/uploadImg.png')"
          style="width: 100px; height: 100px"
        ></a>
    </div>

    <ht-custom-dialog
      title="上传图片"
      :visible.sync="dialogVisible"
      :close-on-press-escape="false"
      :width="`${squareLayoutWidth+60}px`"
      @close="dialogVisible=false; cropperLoadingBt = false"
    >
      <template v-if="dialogVisible" slot="content">
        <div class="info">
          <!--          <div class="name">{{ fileName }}-->
          <!--            <span class="pixel">（{{ canvas.width }} * {{ canvas.height }} 像素）</span>-->
          <!--          </div>-->
          <div v-if="note" class="note">{{ note }}</div>
        </div>
        <div class="cropper-image">
          <div :style="cropperLayoutStyle">
            <el-progress
              class="progress"
              :color="customColorMethod"
              :stroke-linecap="'butt'"
              :stroke-width="12"
              :text-inside="true"
              :percentage="percentage"
            />
            <HtCropper
              ref="ht-cropper"
              class="copper"
              :image="image"
              :fixed="fixed"
              :fixed-box="fixedBox"
              :fixed-number="fixedNumber"
              :auto-crop-width="autoCropWidth"
              :auto-crop-height="autoCropHeight"
              @preview="onEventPreview"
              @get-crop-data="onEventGetCropData"
              @finish="onEventCropper"
            />
            <div v-if="shortcutKey" class="button-team">
              <div>
                <span class="left svg" @click="doLeft()"><svg-icon icon-class="left" /> <span class="label">向左旋转</span></span>
                <span class="left svg" @click="doRight()"><svg-icon icon-class="right" /> <span class="label">向右旋转</span></span>
              </div>
              <div>
                <span class="item svg" @click="doRefresh()"><svg-icon icon-class="refresh" /></span>
                <span class="item svg" @click="doEnlarge()"> <svg-icon icon-class="enlarge" /></span>
                <span class="item svg" @click="doReduce()"><svg-icon icon-class="reduce" /></span>
                <span class="item svg" @click="doPreview()"> <svg-icon icon-class="preview" /></span>
              </div>
            </div>
          </div>

          <div v-if="isCircle" class="avatar">
            <div class="avatar-label">头像预览</div>
            <el-image :src="avatar" class="avatar-img" />
          </div>
        </div>

        <el-divider class="divider" />

        <div class="cropper-bt">
          <el-button icon="el-icon-close" type="primary" plain @click="dialogVisible=false; cropperLoadingBt = false">取消</el-button>
          <el-button icon="el-icon-scissors" type="primary" :loading="cropperLoadingBt" @click="doCropper()">裁剪并上传服务器</el-button>
        </div>

        <div v-show="model" class="model">
          <div class="model-show" @click="model = false">
            <img :src="modelSrc" alt="" @click="model = false">
          </div>
        </div>
      </template>
    </ht-custom-dialog>
  </div>
</template>

<script>
import HtCropper from '@/components/HtCropper'
import { getUrl, upload } from '@/utils/minio'
import { Base64ToBlob, getCosFileUrl, getImageUrl, sliceUploadFiles } from '@/utils/cos'
import { FILE_ACCEPT, filenameWithTimestamp } from '@/utils'

const MAX_FILE_SIZE = 1024 * 1024 * 5

export default {
  name: 'HtCropperUploadButton',
  components: { HtCropper },
  props: {
    fileType: {
      type: Array,
      // ['image']需要单独写
      default: () => { return ['image'] },
      validator(arr) {
        const tempArr = arr.filter(item => {
          return ['image', 'doc', 'pdf', 'excel', 'powerpoint', 'txt', 'zip', 'security', 'all'].includes(item)
        })
        return tempArr.length === arr.length
      }
    },
    isImgUpload: {
      type: Boolean,
      default: false
    },
    plain: {
      type: Boolean,
      default: false
    },
    buttonType: {
      type: String,
      default: 'success'
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
    // 截图框比例固定
    fixed: {
      type: Boolean,
      default: true
    },
    // 截图框固定大小
    fixedBox: {
      type: Boolean,
      default: false
    },
    // 宽高比 w/h
    fixedNumber: {
      type: Array,
      default: () => {
        return [1, 1]
      }
    },
    // 只有自动截图开启 宽度高度才生效
    autoCropWidth: {
      type: Number,
      default: 600
    },
    autoCropHeight: {
      type: Number,
      default: 300
    },
    shortcutKey: {
      type: Boolean,
      default: true
    },
    note: {
      type: String,
      default: ''
    },
    isCircle: {
      type: Boolean,
      default: false
    },
    isMinioMode: {
      type: Boolean,
      default: false
    },
    squareLayoutWidth: {
      type: Number,
      default: 600
    },
    keyPrefix: {
      type: String,
      default: 'litian/admin'
    }
  },
  data() {
    return {
      dialogVisible: false,
      cropperLoadingBt: false,
      avatar: null,
      image: null,
      fileName: '',
      percentage: 0,
      model: false,
      modelSrc: '',
      layoutHeight: 362,
      circleLayoutWidth: 700,
      canvas: {
        width: 0,
        height: 0
      },
      filesValue: ''
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
    cropperLayoutStyle() {
      return {
        width: `${this.isCircle ? this.circleLayoutWidth : this.squareLayoutWidth}px`,
        height: `${this.layoutHeight}px`
      }
    }
  },
  methods: {
    onFileInputClick() {
      this.filesValue = ''
      this.$refs.fileInputBtn.click()
    },
    onFilesSelected(ev) {
      ev.preventDefault()
      if (ev.target.files[0].size >= MAX_FILE_SIZE) {
        this.$message({ message: `文件大小不能超过${MAX_FILE_SIZE / 1024 / 1024}MB`, type: 'warning' })
      } else {
        this.onPicker(ev.target.files[0])
      }
    },
    onPicker(file) {
      this.initData()
      this.fileName = file.name
      this.toImage(file)
    },
    initData() {
      this.percentage = 0
      this.canvas = { height: 0, width: 0 }
      this.fileName = ''
    },
    toImage(file) {
      const fr = new FileReader()
      const image = new Image()
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      image.onload = (e) => {
        const MAX_WIDTH = 2000
        const MAX_HEIGHT = 2000
        const imageWidth = image.width
        const imageHeight = image.height
        let canvasWidth = imageWidth
        let canvasHeight = imageHeight
        if (imageWidth > MAX_WIDTH || imageHeight > MAX_HEIGHT) {
          if (imageWidth > imageHeight) {
            canvasWidth = MAX_WIDTH
            canvasHeight = MAX_WIDTH * (imageHeight / imageWidth)
          } else {
            canvasHeight = MAX_HEIGHT
            canvasWidth = MAX_HEIGHT * (imageWidth / imageHeight)
          }
        }
        canvas.width = canvasWidth
        canvas.height = canvasHeight
        context.drawImage(image, 0, 0, canvasWidth, canvasHeight)
        this.image = canvas.toDataURL('image/jpeg', 0.7)
        this.canvas = canvas
        // 自动打开截图对话框
        this.dialogVisible = true
      }
      fr.onload = (e) => {
        image.src = e.target.result
      }
      fr.readAsDataURL(file)
    },
    customColorMethod(percentage) {
      if (percentage < 25) {
        return '#909399'
      } else if (percentage < 50 && percentage > 25) {
        return '#f56c6c'
      } else if (percentage < 75 && percentage > 50) {
        return '#e6a23c'
      } else {
        return '#67c23a'
      }
    },
    doRefresh() {
      this.$refs['ht-cropper'].refresh()
    },
    doEnlarge() {
      this.$refs['ht-cropper'].enlarge()
    },
    doReduce() {
      this.$refs['ht-cropper'].reduce()
    },
    doLeft() {
      this.$refs['ht-cropper'].rotateLeft()
    },
    doRight() {
      this.$refs['ht-cropper'].rotateRight()
    },
    doPreview() {
      this.$refs['ht-cropper'].preview()
    },
    doCropper() {
      this.$refs['ht-cropper'].finish()
    },
    onEventPreview(data) {
      this.model = true
      this.modelSrc = data
    },
    onEventGetCropData(data) {
      this.avatar = data
    },
    // 上传进度
    progressOnMinio(progressEvent) {
      this.percentage = Math.floor(((progressEvent.loaded * 100) / progressEvent.total))
    },
    onUploadFiles(data) {
      if (this.isMinioMode) {
        this.useMinio(data)
      } else {
        this.useCos(data)
      }
    },
    onEventCropper(data) {
      const file = Base64ToBlob(data)
      file.name = this.fileName
      this.cropperLoadingBt = true
      if (this.isMinioMode) {
        this.useMinio(file)
      } else {
        this.useCos(file)
      }
    },
    beginUpload() {
      this.$emit('on-upload-start')
      this.$emit('on-upload-progress', 1, 0)
    },
    // 使用minio方式上传
    useMinio(file) {
      this.beginUpload()
      getUrl(file, this.keyPrefix).then(a => {
        upload(file, a, this.progressOnMinio).then(b => {
          this.dialogVisible = false
          this.cropperLoadingBt = false
          this.$emit('upload-success', b)
        }).catch(() => {
          this.$message({ message: `上传错误`, type: 'error' })
          this.cropperLoadingBt = false
        })
      }).catch(() => {
        this.$message({ message: `获取minio url错误`, type: 'error' })
        this.cropperLoadingBt = false
      })
    },
    // 使用cos方式上传
    useCos(file) {
      const files = []
      this.beginUpload()
      files.push({ key: this.makeFileKey(file.name), body: file })
      sliceUploadFiles(files, null, this.onUploadProgress,
        (err, data) => {
          if (!err) {
            this.dialogVisible = false
            this.cropperLoadingBt = false
            const urls = []
            data.files.forEach(item => {
              urls.push(this.fileType === 'image' ? getImageUrl(item) : getCosFileUrl(item))
            })
            this.$emit('upload-success', urls[0])
          } else {
            this.$message({ message: `上传失败: ${err.error}`, duration: 1500, type: 'error' })
            this.cropperLoadingBt = false
          }
        }
      )
    },
    makeFileKey(fileName) {
      return `${this.keyPrefix}/${filenameWithTimestamp(fileName, this.uploadTemp)}`
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/styles/variables.scss";
.info {
  margin-bottom: 10px;
}
.cropper-image {
  width: 100%;
  height: 100%;
  padding-bottom: 50px;
  display: flex;
  align-items: flex-end;
}
.progress {
  width: 100%;
  ::v-deep .el-progress {
    line-height: 0;
  }
  ::v-deep .el-progress-bar {
    padding-right: 0;
    margin-right: 0;
  }
  ::v-deep .el-progress-bar__innerText {
    display: list-item;
  }
  ::v-deep .el-progress-bar__outer {
    border-radius: 0;
  }
  ::v-deep .el-progress-bar__inner {
    border-radius: 0;
  }
}
.name {
  font-size: 30px;
  font-weight: bold;
  color: #000000;
}
.pixel {
  margin-top: 10px;
  font-size: 16px;
  color: #bbbbbb;
}
.cropper-bt {
  margin-top: 40px;
  margin-bottom: 10px;
  text-align: right;
}
.button-team {
  display: flex;
  margin: 20px 0;
  justify-content: space-between;
  .svg {
    background-color: #ECE5D0;
    border-radius: 5px;
    color: $main-color;
    font-size: 18px;
    cursor: pointer;
  }
  .label {
    font-size: 14px;
    height: 22px;
    display: inline-block;
    vertical-align: middle;
  }
  .left {
    margin-right: 10px;
    padding: 1px 8px;
  }
  .item {
    margin-left: 10px;
    padding: 1px 6px;
  }
}

.note {
  color: $paleRed;
  margin-top: 10px;
  font-size: 14px;
}

.avatar {
  margin-left: 60px;
  margin-bottom: -15px;
  .avatar-label {
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 10px;
    color: $main-color;
  }
  .avatar-img {
    width: 200px;
    height: 200px;
    border-radius: 100px;
    background-color: black;
    border: 1px solid #bbbbbb;
  }
}

.model {
  position: fixed;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
}

.model-show {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  text-align: center;
}

.model img {
  display: block;
  margin: auto;
  max-width: 80%;
  width: auto;
  user-select: none;
  background-position: 0px 0px, 10px 10px;
  background-size: 20px 20px;
  background-image: linear-gradient(
      45deg,
      #eee 25%,
      transparent 25%,
      transparent 75%,
      #eee 75%,
      #eee 100%
  ),
  linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);
}

</style>

