<template>
  <div v-loading="isLoading" class="rich-text-editor">
    <textarea :id="id" />
    <div v-if="!isEdit" v-html="value" />
  </div>
</template>

<script>
import { toolbar, fontSizeFormats, fontFormats, styleFormats, plugins } from './options'
import { getUrl, upload } from '@/utils/minio'
import { getCosFileUrl, getImageUrl, sliceUploadFiles } from '@/utils/cos'
import { filenameWithTimestamp } from '@/utils'

export default {
  name: 'HtRichTextEditor',
  components: { },
  props: {
    id: {
      type: String,
      default: function() {
        return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
      }
    },
    value: {
      type: String,
      default: ''
    },
    isEdit: {
      type: Boolean,
      default: true
    },
    keyPrefix: {
      type: String,
      default: 'cms'
    },
    // 用minio上传
    isMinioMode: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tinymce: null,
      isLoading: false
    }
  },
  watch: {
  },
  mounted() {
    this.initTinymce()
  },
  created() {
  },
  methods: {
    initTinymce() {
      // eslint-disable-next-line no-undef
      this.tinymce = tinymce

      this.tinymce.init({
        language: 'zh-Hans',
        selector: `#${this.id}`,
        height: 500,
        menubar: true,
        relative_urls: false,
        remove_script_host: false,
        font_formats: fontFormats,
        fontsize_formats: fontSizeFormats,
        style_formats: styleFormats,
        toolbar: toolbar,
        plugins: plugins,
        browser_spellcheck: true,
        contextmenu: false,
        fontsize: '12pt',
        link_title: false,
        branding: false,
        paste_data_images: true,
        nonbreaking_force_tab: true,
        image_title: true,
        automatic_uploads: true,
        init_instance_callback: editor => {
          this.editor = editor
          editor.setContent(this.value)
          editor.on('NodeChange Change KeyUp SetContent', () => {
            this.$emit('input', editor.getContent())
          })
        },
        // 粘贴的图片上传
        images_upload_handler: this.imagesUploadHandler,
        file_picker_types: 'image',
        // 选图片上传
        file_picker_callback: this.filePickerCallback
      })
    },
    makeFileKey(fileName) {
      return `${this.keyPrefix}/${filenameWithTimestamp(fileName, this.uploadTemp)}`
    },
    blobToFile(blobObj, fileName) {
      blobObj.lastModifiedDate = new Date() // 文件最后的修改日期
      blobObj.name = fileName // 文件名
      return new File([blobObj], fileName, { type: blobObj.type, lastModified: Date.now() })
    },
    imagesUploadHandler(blobInfo, progress) {
      return new Promise((resolve, reject) => {
        const file = this.blobToFile(blobInfo.blob(), blobInfo.filename())
        this.useCos(file, (url) => {
          resolve(url)
        })
      })
    },
    filePickerCallback(cb, value, meta) {
      const input = document.createElement('input')
      if (input) {
        input.setAttribute('type', 'file')
        input.setAttribute('accept', 'image/*')
        const _this = this

        input.addEventListener('change', (e) => {
          const file = e.target.files[0]
          const reader = new FileReader()
          reader.addEventListener('load', () => {
            if (_this.isMinioMode) {
              this.useMinio(file, cb)
            } else {
              this.useCos(file, cb)
            }
          })
          reader.readAsDataURL(file)
        })
        input.click()
      }
    },
    useCos(file, cb) {
      const files = []
      files.push({ key: this.makeFileKey(file.name), body: file })

      this.imageLoadingEvent(true)
      sliceUploadFiles(files, null, null, (err, data) => {
        if (!err) {
          const urls = []
          data.files.forEach(item => {
            urls.push(this.fileType === 'image' ? getImageUrl(item) : getCosFileUrl(item))
          })
          this.imageLoadingEvent(false)
          cb(urls[0], { title: file.name })
        } else {
          this.showErrMsg()
        }
      })
    },
    useMinio(file, cb) {
      getUrl(file, this.keyPrefix).then(a => {
        upload(file, a, null).then(b => (cb(b))).catch(() => (this.showErrMsg()))
      }).catch(() => (this.showErrMsg()))
    },
    showErrMsg() {
      this.imageLoadingEvent(false)
      this.$message({ message: `上传失败!`, duration: 1500, type: 'error' })
    },
    imageLoadingEvent(bl) {
      this.isLoading = bl
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
