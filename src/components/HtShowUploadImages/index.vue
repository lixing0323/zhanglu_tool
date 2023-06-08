<template>
  <div style="display: inline-block;">
    <span v-for="(i, index) in images" :key="index" class="imageBox">
      <span v-if="canDelete" class="iconBox" @click="deleteImage(i,index)">
        <a><i class="el-icon-close" style="position: absolute;top: 0;right: 0;color: white;" /></a>
      </span>
      <video v-if="isVideo(i)" controls width="100%" height="100%">
        <source :src="i" type="video/webm">
      </video>
      <el-image
        v-else
        style="width: 100%; height: 100%"
        fit="contain"
        :src="i"
        :preview-src-list="imageList"
      />
    </span>
  </div>
</template>

<script>
export default {
  name: 'HtShowUploadImages',
  props: {
    images: {
      type: Array,
      default: undefined
    },
    canDelete: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      showIcon: false,
      preImgList: []
    }
  },
  computed: {
    imageList() {
      return this.images.filter(item => (!this.isVideo(item)))
    }
  },
  methods: {
    isVideo(src) {
      const match = ['.flv', '.avi', '.mov', '.mp4', '.mmv']
      const dotIdx = src.lastIndexOf('.')
      const suffix = src.substr(dotIdx, src.length - dotIdx)
      return match.indexOf(suffix) !== -1
    },
    deleteImage(i, index) {
      this.images.splice(index, 1)
      this.$emit('delete-image', index, this.images)
    }
  }
}
</script>

<style scoped>
.iconBox {
  display: inline-block;
  width: 15px;
  height: 15px;
  background-color: grey;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 999;
  opacity: 0.5;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
}
.imageBox {
  position: relative;
  display: inline-block;
  width: 100px;
  height: 100px;
  border: 1px solid #E0E0E0;
  margin-right: 10px;
}
</style>
