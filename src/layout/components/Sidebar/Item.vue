<script>
import { useAuthUserStore } from '@/store/modules/user'
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    collapse: {
      type: String,
      default: '1'
    },
    hiddenCollapse: {
      type: String,
      default: '1'
    }
  },
  render(h, context) {
    const { icon, title, collapse, hiddenCollapse } = context.props
    const vnodes = []

    if (icon) {
      // vnodes.push(<svg-icon icon-class={icon}/>)

      if (icon === 'customer') {
        if (hiddenCollapse === '0' && useAuthUserStore().$state.waitBiddingCustomerCount > 0) {
          vnodes.push(<div>
            <svg-icon icon-class={icon}/>
            <el-badge class='icon-badge' is-dot value={useAuthUserStore().$state.waitBiddingCustomerCount} max={99} />
          </div>)
        } else {
          vnodes.push(<svg-icon icon-class={icon}/>)
        }
      } else if (icon === 'customerRequirement') {
        if (hiddenCollapse === '0' && useAuthUserStore().$state.customerRequirementCount > 0) {
          vnodes.push(<div>
            <svg-icon icon-class={icon}/>
            <el-badge class='icon-badge' is-dot value={useAuthUserStore().$state.customerRequirementCount} max={99} />
          </div>)
        } else {
          vnodes.push(<svg-icon icon-class={icon}/>)
        }
      } else if (icon === 'productApplication') {
        if (hiddenCollapse === '0' && useAuthUserStore().$state.productApplicationCount > 0) {
          vnodes.push(<div>
            <svg-icon icon-class={icon}/>
            <el-badge class='icon-badge' is-dot value={useAuthUserStore().$state.productApplicationCount} max={99}/>
          </div>)
        } else {
          vnodes.push(<svg-icon icon-class={icon}/>)
        }
      } else if (icon === 'userFeedback') {
        if (collapse === '0' && useAuthUserStore().$state.customerFeedbackCount > 0) {
          vnodes.push(<div>
            <svg-icon icon-class={icon}/>
            <el-badge class='icon-badge' is-dot value={useAuthUserStore().$state.customerFeedbackCount} max={99} />
          </div>)
        } else {
          vnodes.push(<svg-icon icon-class={icon}/>)
        }
      } else if (icon === 'service') {
        if (hiddenCollapse === '0' && (useAuthUserStore().$state.serviceOrderCount > 0 || useAuthUserStore().$state.customerSupportCount > 0)) {
          vnodes.push(<div>
            <svg-icon icon-class={icon}/>
            <el-badge class='icon-badge' is-dot value={useAuthUserStore().$state.serviceOrderCount + useAuthUserStore().$state.customerSupportCount} max={99} />
          </div>)
        } else {
          vnodes.push(<svg-icon icon-class={icon}/>)
        }
      } else {
        vnodes.push(<svg-icon icon-class={icon}/>)
      }
    }

    if (title) {
      // vnodes.push(<span slot='title'>{(title)}</span>)
      if (title === '客户管理') {
        if (useAuthUserStore().$state.waitBiddingCustomerCount > 0) {
          vnodes.push(<span class='title-span-menu' slot='title'>
            {(title)}
            <el-badge class='title-badge' value={useAuthUserStore().$state.waitBiddingCustomerCount} />
          </span>)
        } else {
          vnodes.push(<span slot='title'>{(title)}</span>)
        }
      } else if (title === '公海客户') {
        if (useAuthUserStore().$state.waitBiddingCustomerCount > 0) {
          vnodes.push(<span class='title-span-sub-menu' slot='title'>
            {(title)}
            <el-badge class='title-badge' value={useAuthUserStore().$state.waitBiddingCustomerCount} />
          </span>)
        } else {
          vnodes.push(<span slot='title'>{(title)}</span>)
        }
      } else if (title === '客户需求') {
        if (useAuthUserStore().$state.customerRequirementCount > 0) {
          vnodes.push(<span class='title-span-menu' slot='title'>
            {(title)}
            <el-badge class='title-badge' value={useAuthUserStore().$state.customerRequirementCount} />
          </span>)
        } else {
          vnodes.push(<span slot='title'>{(title)}</span>)
        }
      } else if (title === '我的客户需求') {
        if (useAuthUserStore().$state.customerRequirementCount > 0) {
          vnodes.push(<span class='title-span-sub-menu' slot='title'>
            {(title)}
            <el-badge class='title-badge' value={useAuthUserStore().$state.customerRequirementCount} />
          </span>)
        } else {
          vnodes.push(<span slot='title'>{(title)}</span>)
        }
      } else if (title === '产品申请') {
        if (useAuthUserStore().$state.productApplicationCount > 0) {
          vnodes.push(<span class='title-span-menu' slot='title'>
            {(title)}
            <el-badge class='title-badge' value={useAuthUserStore().$state.productApplicationCount} />
          </span>)
        } else {
          vnodes.push(<span slot='title'>{(title)}</span>)
        }
      } else if (title === '我的客户申请') {
        if (useAuthUserStore().$state.productApplicationCount > 0) {
          vnodes.push(<span class='title-span-sub-menu' slot='title'>
            {(title)}
            <el-badge class='title-badge' value={useAuthUserStore().$state.productApplicationCount} />
          </span>)
        } else {
          vnodes.push(<span slot='title'>{(title)}</span>)
        }
      } else if (title === '客户反馈') {
        if (useAuthUserStore().$state.customerFeedbackCount > 0) {
          vnodes.push(<span class='title-span-menu' slot='title'>
            {(title)}
            <el-badge class='title-badge' value={useAuthUserStore().$state.customerFeedbackCount} />
          </span>)
        } else {
          vnodes.push(<span slot='title'>{(title)}</span>)
        }
      } else if (title === '服务管理') {
        if (useAuthUserStore().$state.serviceOrderCount > 0 || useAuthUserStore().$state.customerSupportCount > 0) {
          vnodes.push(<span class='title-span-menu' slot='title'>
            {(title)}
            <el-badge class='title-badge' value={useAuthUserStore().$state.serviceOrderCount + useAuthUserStore().$state.customerSupportCount} />
          </span>)
        } else {
          vnodes.push(<span slot='title'>{(title)}</span>)
        }
      } else if (title === '服务订单') {
        if (useAuthUserStore().$state.serviceOrderCount > 0) {
          vnodes.push(<span class='title-span-menu' slot='title'>
            {(title)}
            <el-badge class='title-badge' value={useAuthUserStore().$state.serviceOrderCount} />
          </span>)
        } else {
          vnodes.push(<span slot='title'>{(title)}</span>)
        }
      } else if (title === '服务核销') {
        if (useAuthUserStore().$state.customerSupportCount > 0) {
          vnodes.push(<span class='title-span-menu' slot='title'>
            {(title)}
            <el-badge class='title-badge' value={useAuthUserStore().$state.customerSupportCount} />
          </span>)
        } else {
          vnodes.push(<span slot='title'>{(title)}</span>)
        }
      } else {
        vnodes.push(<span slot='title'>{(title)}</span>)
      }
    }
    return vnodes
  }
}
</script>

<style scoped lang="scss">
.icon-badge{
  margin-left: -15px;
  margin-top: -5px;

  ::v-deep .is-dot{
    height: 10px;
    width: 10px;
  }

  ::v-deep .el-badge__content{
    border: none;
  }
}

.title-badge{
  margin-left: 5px;
  top: -2px;

  ::v-deep .el-badge__content{
    border: 1px solid #f56c6c;
    position: relative;
    top: 0;
    line-height: 16px;
  }
}
</style>
