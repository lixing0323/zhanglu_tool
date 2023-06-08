<template>
  <el-row class="clearfix">
    <div style="float:left;">
      <slot name="leftButton" />
    </div>
    <div style="float: right;">
      <slot name="extraButton1" />
      <el-button
        v-if="isNeedCancel"
        :class="cancelButtonClass"
        :icon="isCustomCancelButtonIcon ? '' : cancelButtonIcon"
        @click="onCancel"
      >
        <slot name="cancelButtonIcon" />
        {{ cancelButton }}
      </el-button>
      <slot name="extraButton2" />
      <el-button
        v-if="isNeedConfirm"
        :class="confirmButtonClass"
        :loading="isLoading"
        :icon="isCustomConfirmButtonIcon ? '' : confirmButtonIcon"
        type="primary"
        @click="onConfirm"
      >
        <slot name="confirmButtonIcon" />
        {{ confirmButton }}
      </el-button>
      <slot name="extraButton3" />
    </div>
  </el-row>
</template>

<script>
export default {
  name: 'HtSubmitButton',
  props: {
    isNeedCancel: {
      type: Boolean,
      default: true
    },
    isNeedConfirm: {
      type: Boolean,
      default: true
    },
    cancelButton: {
      type: String,
      default: '取消'
    },
    confirmButton: {
      type: String,
      default: '确定'
    },
    cancelButtonIcon: {
      type: String,
      default: 'el-icon-close'
    },
    isCustomCancelButtonIcon: {
      type: Boolean,
      default: false
    },
    isCustomConfirmButtonIcon: {
      type: Boolean,
      default: false
    },
    confirmButtonIcon: {
      type: String,
      default: 'el-icon-check'
    },
    cancelButtonClass: {
      type: String,
      default: 'main-color-plain-info-button'
    },
    confirmButtonClass: {
      type: String,
      default: 'main-color-button'
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    buttonAlign: {
      type: String,
      default: 'right'
    }
  },
  methods: {
    onCancel() {
      this.$emit('on-cancel')
    },
    onConfirm() {
      this.$emit('on-confirm')
    }
  }
}
</script>

<style scoped>

</style>
