<template>
  <el-popover v-model="visible" placement="top" :width="width">
    <div slot="default">
      <p>{{ confirmTitle }}</p>
      <div style="text-align: right; margin: 3px 6px 0 0">
        <!--        TODO-->
        <ht-button type="text" size="mini" class="grey-button-style" @click="visible=false">{{ negativeButtonTitle }}</ht-button>
        <ht-button type="text" size="mini" class="red-button-style" @click="buttonClicked">{{ positiveButtonTitle }}</ht-button>
      </div>
    </div>
    <el-button
      v-if="dangerText"
      slot="reference"
      :status="dangerText ? 'danger' : 'primary'"
      :loading="loading"
      :type="type"
      :size="size"
      :icon="icon"
      :disabled="disabled"
      :style="{ fontWeight: fontWeight }"
      :class="[
        disabled ? '' : 'danger-btn',
        {
          'is-disabled': disabled
        }
      ]"
    >
      <slot name="icon" />
      <slot />
    </el-button>
    <el-button v-else slot="reference" :class="dangerText ? 'red-button-style' : 'green-button-style'" :style="{ color: buttonColor, fontWeight: fontWeight }" :loading="loading" :type="type" :size="size" :icon="icon" :disabled="disabled">
      <slot name="icon" />
      <slot />
    </el-button>
  </el-popover>
</template>

<script>
export default {
  name: 'HtPopoverButton',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: undefined
    },
    width: {
      type: Number,
      default: 180
    },
    positiveButtonTitle: {
      type: String,
      default: '是'
    },
    negativeButtonTitle: {
      type: String,
      default: '否'
    },
    confirmTitle: {
      type: String,
      default: '是否确认?'
    },
    type: {
      type: String,
      default: 'default'
    },
    size: {
      type: String,
      default: 'mini'
    },
    icon: {
      type: String,
      default: ''
    },
    dangerText: {
      type: Boolean,
      default: true
    },
    context: { type: [Object, String, Number, Array], default: null },
    buttonColor: { type: String, default: null },
    fontWeight: { type: String, default: 'normal' }
  },
  data() {
    return {
      visible: false
    }
  },
  methods: {
    buttonClicked() {
      this.visible = false
      this.$emit('confirmed', this.context)
    }
  }
}
</script>

<style lang="scss" scoped>
  .danger-btn {
    color: #f56c6c;
    &:hover {
      color: #f56c6c;
    }
  }

  .bt-height {
    line-height: 36px;
  }
</style>
