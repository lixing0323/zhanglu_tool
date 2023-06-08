<template>
  <div>
    <el-form ref="form" v-loading="formLoading" :model="form" :rules="rules" label-width="100px" label-position="right">
      <el-form-item label="用户组：" prop="group" class="item">
        <el-input v-model="form.group" type="text" />
      </el-form-item>
      <el-form-item label="用户名：" prop="username" class="item">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="用户编码：" prop="code" class="item">
        <el-input v-model="form.code" />
      </el-form-item>
      <el-form-item label="时间：" prop="time" class="item">
        <el-date-picker v-model="form.time" type="datetime" />
      </el-form-item>
      <el-form-item label="等级：" prop="level" class="item">
        <el-input v-model="form.level" />
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
        group: '',
        username: '',
        code: '',
        level: '',
        time: ''
      },
      rules: {
        group: [
          { required: true, message: '请填写用户组', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请填写用户名', trigger: 'blur' }
        ],
        level: [
          { required: true, message: '请填写等级', trigger: 'blur' }
        ],
        time: [
          { required: true, message: '请填写耗时', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请填写编码', trigger: 'blur' }
        ]

      }
    }
  },
  created() {
  },
  methods: {
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
    },
    onEdit(row) {
      this.rowId = row.id
      this.form = Object.assign({}, row)
    },
    getJsonData() {
      return {
      }
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
