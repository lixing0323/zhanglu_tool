<template>
  <div class="action-panel">
    <div class="action-item">
      <slot name="left" />
      <ht-button v-if="onSearch" type="primary" size="mini" icon="el-icon-search" @click="onSearch">
        搜索
      </ht-button>
      <ht-button v-if="onClear" type="info" size="mini" icon="el-icon-refresh-left" @click="onClear">
        重置
      </ht-button>
    </div>
    <div class="action-item-right">
      <slot name="right" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'HtActionPanel',
  props: {
    onSearch: {
      type: Function,
      default: undefined
    },
    onClear: {
      type: Function,
      default: undefined
    }
  },
  methods: {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .action-panel {
    display: flex;
    display: -webkit-flex;
    flex-wrap: wrap;
    -webkit-flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    border: 0 solid transparent;

    .action-item {
      display: -webkit-flex;
      display: flex;
      flex-wrap: wrap;
      -webkit-flex-wrap: wrap;
      align-items: center;
      margin-right: 8px;
      > :not(:last-child) {
        margin-right: 8px;
      }
      > :nth-child(n) {
        margin-bottom: 8px;
      }
    }

    .action-item-right {
      @extend .action-item;
      margin-left: auto;
      float: right;
    }

    .el-input, .el-select, .el-date-picker {
      display: inline-block;
      vertical-align: middle;
      width: 150px;
    }

    .filter-item-small {
      width: 100px;
    }

    .filter-item {
      width: 165px;
    }

    .filter-item-large {
      width: 200px;
    }

    .filter-item-extra-large {
      width: 320px;
    }

    .filter-item-full-width {
      width: 100%;
    }

    .el-button + .el-button {
      margin-left: 0;
    }
  }
</style>
