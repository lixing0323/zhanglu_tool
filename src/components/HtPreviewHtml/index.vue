<template>
  <div class="preview-dialog">
    <div class="notice-container">
      <div class="title"> {{ info.name }}</div>
      <div class="time">发布时间： {{ getTimeDefaultNow(info.publishedDate) }} </div>
      <div v-if="coverUrl" class="cover">
        <el-image :src="coverUrl" alt="" class="image" lazy fit="cover" />
      </div>
      <div class="content" v-html="info.content" />
    </div>

    <div v-if="showAttachments && info.attachments && info.attachments.length > 0" class="attachments-container">
      <span class="attachments-label">公告附件：</span>
      <el-link
        v-for="i in info.attachments"
        :key="i.url"
        class="blue-link att-item"
        icon="el-icon-link"
        @click="downloadFile(i.filename, i.url)"
      >{{ i.filename }}</el-link>
    </div>

    <div v-if="showPreviewBt" class="buttons extra-bt" @click="onExit()">
      <svg-icon icon-class="exit" class="svg" /><span class="preview">{{ exitText }}</span>
    </div>
  </div>
</template>

<script>

import { downloadFile, getTimeDefaultNow } from '@/utils'

export default {
  name: 'HtPreviewHtml',
  components: { },
  props: {
    showAttachments: {
      type: Boolean,
      default: false
    },
    coverUrl: {
      type: String,
      default: ''
    },
    showPreviewBt: {
      type: Boolean,
      default: true
    },
    exitText: {
      type: String,
      default: '退出预览'
    }
  },
  data() {
    return {
      uploadVisible: false,
      info: {
        title: '',
        coverUrl: '',
        content: '',
        publishedDate: '',
        attachments: []
      }
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    downloadFile, getTimeDefaultNow,
    open(info) {
      this.info = info
    },
    onExit() {
      this.$emit('exit')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.buttons {
  text-align: right;
  margin-top: 10px;
}
.preview-dialog {
  .notice-container{
    border: 1px solid #cccccc;
    padding: 20px;
    margin-bottom: 20px;
    max-height: 500px;
    overflow-y: scroll;
  }
  .title {
    text-align: center;
    font-weight: bold;
    font-size: 28px;
    color: #000;
  }
  .time {
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
    font-size: 14px;
    color: #999;
  }
  .content {
    margin-top: 30px;
    line-height: 30px;
    font-size: 16px;
    text-indent: 2em;
    ::v-deep img {
      max-width: 100%;
      height: auto;
      display: block;
      margin: 0 auto;
    }
  }
}

.extra-bt {
  color: $main-color;
  cursor: pointer;
  .preview {
    text-decoration: underline;
    margin-left: 5px;
  }
}

.attachments-container{
  display: flex;
  align-items: center;
  .att-item {
    margin-right: 15px;
  }
}

.cover {
  margin-top: 20px;
  text-align: center;
  .image {
    width: 455px;
    height: 300px;
  }
}

</style>

