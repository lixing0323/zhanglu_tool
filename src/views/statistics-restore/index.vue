<template>
  <div>
    <el-card>
      <ht-action-panel>
        <template slot="left">
          <el-input v-model="listQuery.name" placeholder="请输入名称" class="filter-item" @keyup.enter.native="onSearch" />
          <el-button type="primary" icon="el-icon-search" @click="onSearch">查询</el-button>
          <el-button type="default" icon="el-icon-delete" @click="onClear">重置</el-button>
        </template>
        <template slot="right">
          <el-button type="primary" icon="el-icon-circle-plus" @click="onCreate()">新建</el-button>
        </template>
      </ht-action-panel>
      <ht-table ref="table" v-loading="isLoading" :data="list" row-key="id">
        <ht-table-column type="index" width="55" label="序号" />
        <ht-table-column label="名称" prop="name" />
        <ht-table-column label="恢复方式" prop="method" />
        <ht-table-column label="类型" prop="type" />
        <ht-table-column label="附件" prop="file">
          <template slot-scope="{row}">
            <i v-if="row" class="el-icon-paperclip" /> 附件（{{ row.file }}）
          </template>
        </ht-table-column>
        <ht-table-column label="操作" width="90" fixed="right">
          <template slot-scope="{ row }">
            <el-button type="text" class="primary" @click="onEdit(row)">编辑</el-button>
            <el-button type="text" @click="onDelete(row)">删除</el-button>
          </template>
        </ht-table-column>
      </ht-table>
      <ht-pagination
        v-show="page.total>0"
        ref="page"
        :total="page.total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.perPage"
        :page-sizes="pageSizes"
        @pagination="getList()"
      />
    </el-card>

    <ht-custom-dialog :title="`${isEdit?'编辑':'新建'}`" :visible.sync="dialogVisible" width="400px">
      <form-dialog v-if="dialogVisible" ref="form" @cancel="dialogVisible=false" />
    </ht-custom-dialog>
  </div>
</template>

<script>
import listMixin from '@/views/mixins/list-mixin'
import FormDialog from './form'
import { getList } from './var'

export default {
  components: { FormDialog },
  mixins: [listMixin],
  props: {
  },
  data() {
    return {
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.list = getList()
      this.page.total = this.list.length
      this.isLoading = false
    },
    onCreate() {
      this.dialogVisible = true
      this.isEdit = false
      this.$nextTick(() => {
        this.$refs.form.open(false)
      })
    },
    onEdit(row) {
      this.dialogVisible = true
      this.isEdit = true
      this.$nextTick(() => {
        this.$refs.form.open(true, row)
      })
    },
    onDelete(row) {
      this.$confirm('该操作会删除此数据，是否确认？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({ message: `数据删除成功`, duration: 3000, type: 'success' })
        this.getList()
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
::v-deep .el-select {
  width: 100%;
}
</style>

