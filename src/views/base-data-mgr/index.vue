<template>
  <div>
    <el-card>
      <ht-action-panel>
        <template slot="left">
          <el-input v-model="listQuery.name" placeholder="请输入归类名" class="filter-item" @keyup.enter.native="onSearch" />
          <el-input v-model="listQuery.type" placeholder="请输入负责人" class="filter-item" @keyup.enter.native="onSearch" />
          <el-button type="primary" icon="el-icon-search" @click="onSearch">查询</el-button>
          <el-button type="default" icon="el-icon-delete" @click="onClear">重置</el-button>
        </template>
      </ht-action-panel>
      <ht-table ref="table" v-loading="isLoading" :data="list" row-key="id">
        <ht-table-column type="index" width="55" label="序号" />
        <ht-table-column label="归类名" prop="name" />
        <ht-table-column label="负责人" prop="username" />
        <ht-table-column label="标识码" prop="code" />
        <ht-table-column label="时间" prop="time" />
        <ht-table-column label="等级" prop="level" />
        <ht-table-column label="操作" width="90" fixed="right">
          <template slot-scope="{ row }">
            <el-button type="text" class="primary" @click="onDelete(row)">删除</el-button>
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
  </div>
</template>

<script>
import listMixin from '@/views/mixins/list-mixin'
import { getList } from './var'

export default {
  components: { },
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
    onView() {
    },
    onDelete(row) {
      this.$confirm('此操作将删除该条数据，是否确认？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
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

