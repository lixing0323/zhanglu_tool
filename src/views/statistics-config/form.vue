<template>
  <div>
    <el-form ref="form" v-loading="formLoading" class="business-homepage-form" :model="form" :rules="rules" label-width="200px" label-position="right">
      <el-form-item :label="`${getMenuName()}统计归类：`" prop="name" class="item">
        <el-input v-model="form.name" type="text" />
      </el-form-item>
      <el-form-item label="时间：" prop="date" class="item">
        <el-date-picker v-model="form.date" />
      </el-form-item>
      <el-form-item label="识别码：" prop="code" class="item">
        <el-input v-model="form.code" />
      </el-form-item>
      <el-form-item label="等级：" prop="level" class="item">
        <el-input v-model="form.level" />
      </el-form-item>
      <el-form-item :label="`${getMenuName()}统计模式：`" prop="mode" class="item">
        <el-input v-model="form.mode" />
      </el-form-item>
      <el-form-item :label="`${getMenuName()}统计参数：`" prop="params" class="item">
        <el-input v-model="form.params" />
      </el-form-item>
      <el-form-item label="开始时间：" prop="startTime" class="item">
        <el-date-picker v-model="form.startTime" />
      </el-form-item>
      <el-form-item label="结束时间：" prop="endTime" class="item">
        <el-date-picker v-model="form.endTime" />
      </el-form-item>
      <el-form-item label="方式：" prop="method" class="item">
        <el-input v-model="form.method" />
      </el-form-item>
    </el-form>
    <div style="text-align: center; margin-top: 40px">
      <el-button icon="el-icon-check" type="primary" :loading="submitBtLoading" @click="onSubmit">{{ isEdit?'更新':'新建' }}</el-button>
      <el-button icon="el-icon-close" type="default" @click="onCancel()">取消</el-button>
    </div>
  </div>
</template>

<script>
import { newData } from './var'
import { getMenuName } from '@/utils/business'

export default {
  props: {
  },
  data() {
    return {
      isEdit: false,
      formLoading: false,
      rowId: undefined,
      submitBtLoading: false,
      form: {
        name: '',
        date: '',
        code: '',
        level: '',
        mode: '',
        params: '',
        startTime: '',
        endTime: '',
        method: ''
      },
      rules: {
        name: [
          { required: true, message: '请填写统计归类', trigger: 'blur' }
        ],
        date: [
          { required: true, message: '请选择时间', trigger: 'blur' }
        ],
        level: [
          { required: true, message: '请填写等级', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请填写识别码', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
  },
  methods: {
    getMenuName,
    open(isEdit, row = {}) {
      this.isEdit = isEdit
      this.initForm()
      if (this.isEdit) {
        this.onEdit(row)
      }
    },
    onCancel() {
      this.$emit('close')
    },
    initForm() {
      Object.keys(this.form).forEach(key => {
        this.form[key] = newData[key]
      })
      console.log(this.form)
    },
    onEdit(row) {
      this.rowId = row.id
      this.form = Object.assign({}, row)
    },
    getJsonData() {
      return {}
    },
    getApis(data) {
      return new Promise((resolve, reject) => {
        resolve(data)
      })
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submitBtLoading = true
          this.getApis(this.getJsonData()).then(() => {
            this.submitBtLoading = false
            this.$message({ message: `数据${!this.isEdit ? '新建' : '更新'}成功！`, duration: 3000, type: 'success' })
            this.$emit('submit')
          }).catch(() => (this.submitBtLoading = false))
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
