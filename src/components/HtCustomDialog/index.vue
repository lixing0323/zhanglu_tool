<template>
  <div>
    <el-dialog
      class="dialog"
      :visible.sync="dialogVisible"
      :width="width"
      :modal="modal"
      :append-to-body="appendToBody"
      :modal-append-to-body="modalAppendToBody"
      :close-on-press-escape="closeOnPressEscape"
      :close-on-click-modal="false"
      :show-close="showClose"
      @close="onClose()"
    >
      <template v-if="title" slot="title">
        <div class="title-box">
          <div class="title-span"><span /></div>
          <div class="title-content">
            {{ title }}
            <slot name="extraTitle" />
          </div>
        </div>
      </template>
      <slot />
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'HtCustomDialog',
  props: {
    width: {
      type: String,
      default: '30%'
    },
    title: {
      type: String,
      default: ''
    },
    modal: {
      type: Boolean,
      default: true
    },
    modalAppendToBody: {
      type: Boolean,
      default: true
    },
    appendToBody: {
      type: Boolean,
      default: true
    },
    visible: {
      type: Boolean,
      default: false
    },
    closeOnPressEscape: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    onClose() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.title-box {
  height: 50px;
  line-height: 50px;

  .title-content {
    display: inline-block;
    height: 50px;
    line-height: 50px;
    font-size: 25px;
    font-weight: 500;
    color: $main-color;
  }
}

::v-deep .el-dialog {
  min-width: 400px;
}

::v-deep .el-dialog__body{
  padding: 10px 30px 30px 30px;
}

::v-deep .el-dialog__headerbtn{
  .el-dialog__close {
    font-size: 20px;
    font-weight: 600;
    display: inline-block;
  }
  .el-dialog__close:hover {
    color: $paleRed;
    background: #fbeded;
    border-radius: 1px;
  }
}
</style>
