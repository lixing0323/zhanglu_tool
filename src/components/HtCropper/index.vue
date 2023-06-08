<template>
  <vue-cropper
    ref="cropper"
    :img="image"
    :output-size="option.size"
    :output-type="option.outputType"
    :info="true"
    :full="option.full"
    :can-move="option.canMove"
    :can-move-box="option.canMoveBox"
    :fixed="fixed"
    :fixed-box="fixedBox"
    :fixed-number="fixedNumber"
    :original="option.original"
    :auto-crop="option.autoCrop"
    :auto-crop-width="autoCropWidth"
    :auto-crop-height="autoCropHeight"
    :center-box="option.centerBox"
    :high="option.high"
    :info-true="option.infoTrue"
    :max-img-size="option.maxImgSize"
    :enlarge="option.enlarge"
    :mode="option.mode"
    :limit-min-size="option.limitMinSize"
    @cropMoving="cropMoving"
    @realTime="realTime"
  />
</template>

<script>

export default {
  name: 'HtCropper',
  props: {
    // 原始图
    image: {
      type: String,
      default: undefined
    },
    // 截图框固定大小
    fixedBox: {
      type: Boolean,
      default: false
    },
    // 截图框比例固定
    fixed: {
      type: Boolean,
      default: true
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
    }
  },
  data() {
    return {
      option: {
        full: true, // 必须设置，否则图片质量会有损失
        size: 1,
        outputType: 'png',
        canMove: true,
        fixedBox: false,
        original: false,
        infoTrue: true,
        canMoveBox: true,
        autoCrop: true,
        centerBox: false,
        high: false,
        cropData: {},
        enlarge: 1,
        mode: 'contain',
        maxImgSize: 3000,
        limitMinSize: [100, 120]
      }
    }
  },
  methods: {
    refresh() {
      this.$refs.cropper.refresh()
    },
    enlarge() {
      this.changeScale(1)
    },
    reduce() {
      this.changeScale(-1)
    },
    changeScale(num) {
      num = num || 1
      this.$refs.cropper.changeScale(num)
    },
    rotateLeft() {
      this.$refs.cropper.rotateLeft()
    },
    rotateRight() {
      this.$refs.cropper.rotateRight()
    },
    finish() {
      this.$refs.cropper.getCropData(data => {
        this.$emit('finish', data)
      })
    },
    preview() {
      this.$refs.cropper.getCropData(data => {
        this.$emit('preview', data)
      })
    },
    // 实时预览函数
    realTime(data) {
      this.$refs.cropper.getCropData(data => {
        this.$emit('get-crop-data', data)
      })
    },
    cropMoving(data) {
      this.option.cropData = data
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .cropper-crop-box {
  border: 2px solid red;
}
</style>
