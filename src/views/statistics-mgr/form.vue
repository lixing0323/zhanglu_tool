<template>
  <div>
    <el-form ref="form" v-loading="formLoading" :model="form" :rules="rules" label-width="90px" label-position="right">
      <el-form-item label="名称：" prop="name" class="item">
        <el-input v-model="form.name" type="text" />
      </el-form-item>
      <el-form-item label="介绍：" prop="introduce" class="item">
        <el-input v-model="form.introduce" />
      </el-form-item>
      <el-form-item label="容量：" prop="volume" class="item">
        <el-input v-model="form.volume" />
      </el-form-item>
      <el-form-item label="耗时：" prop="time" class="item">
        <el-input v-model="form.time" />
      </el-form-item>
      <el-form-item label="分类：" prop="category" class="item">
        <el-input v-model="form.category" />
      </el-form-item>
      <el-form-item label="类型：" prop="type" class="item">
        <el-input v-model="form.type" />
      </el-form-item>
      <el-form-item label="备注：" prop="comment" class="item">
        <el-input v-model="form.comment" />
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
        name: '',
        introduce: '',
        volume: '',
        category: '',
        time: '',
        type: '',
        comment: ''
      },
      rules: {
        name: [
          { required: true, message: '请填写名称', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '请填写介绍内容', trigger: 'blur' }
        ],
        volume: [
          { required: true, message: '请填写容量内容', trigger: 'blur' }
        ],
        time: [
          { required: true, message: '请填写耗时', trigger: 'blur' }
        ],
        category: [
          { required: true, message: '请填写分类', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请填写类型', trigger: 'blur' }
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
        name: this.form.name,
        introduce: this.form.introduce,
        volume: this.form.volume,
        category: this.form.category,
        time: this.form.time,
        type: this.form.type,
        comment: this.form.comment
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
