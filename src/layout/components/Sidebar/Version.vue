<template>
  <div class="sidebar-version-container">
    <span style="cursor: pointer; color: #666666">{{ `${title}（v${frontendVersion}）` }}</span>

    <ht-custom-dialog :visible.sync="dialogVisible" width="500px" title="更新日志" @close="dialogVisible = false">
      <template slot="content">
        <div style="margin-top: -20px">
          <template v-if="modifyItems.length > 0">
            <div class="title">修改项：</div>
            <div class="update-content">
              <ol>
                <li v-for="(item,index) in modifyItems" :key="index" class="item">{{ item }}</li>
              </ol>
            </div>
          </template>
          <template v-if="updateItems.length > 0">
            <div class="title">更新项：</div>
            <div class="update-content">
              <ol>
                <li v-for="(item,index) in updateItems" :key="index" class="item">{{ item }}</li>
              </ol>
            </div>
          </template>
        </div>
        <div v-if="showVersion" style="text-align: center; margin-top: 15px">
          <span style="font-size: 12px; font-weight: 600; margin-right: 10px;">前端版本：<span style="font-weight: 400">{{ `v ${frontendVersion}` }} </span></span>
          <span style="font-size: 12px; font-weight: 600">后端版本：<span v-loading="backendLoading" style="font-weight: 400">{{ `v ${backendVersion}` }} </span></span>
        </div>
      </template>
    </ht-custom-dialog>
  </div>
</template>

<script>
import defaultSettings from '@/settings'
import { apiClient } from '@/utils/request'
export default {
  name: 'Version',
  props: {
    showVersion: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      frontendVersion: defaultSettings.version,
      title: defaultSettings.title,
      backendVersion: '',
      backendLoading: false,
      dialogVisible: false,
      modifyItems: [
        '修复了已知页面显示问题'
      ],
      updateItems: [
        '新增服务相关操作日志'
      ]
    }
  },
  methods: {
    openUpdateLogDialog() {
      this.dialogVisible = true
      if (this.showVersion) {
        this.getBackendVersion()
      }
    },
    getBackendVersion() {
      this.backendLoading = true
      apiClient.version.getApiVersion().then(resp => {
        this.backendVersion = resp.versionNum
        this.backendLoading = false
      })
    }
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
</style>

<style scoped lang="scss">
@import "../../../styles/variables";
.sidebar-version-container{
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 12px;
  font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
}

.title{
  font-size: 16px;
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 10px;
}

.update-content{
  margin-left: 30px;
}

.item{
  line-height: 25px;
}
</style>
