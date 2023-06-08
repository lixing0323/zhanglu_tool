<script>
import { TableColumn } from 'element-ui'
export default {
  name: 'HtTableColumn',
  extends: TableColumn,
  props: {
    showOverflowTooltip: {
      type: Boolean,
      default: true
    },
    align: {
      type: String,
      default: 'center'
    }
  }
}
</script>
