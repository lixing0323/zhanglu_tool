<script>
import { Table } from 'element-ui'
export default {
  name: 'HtTable',
  extends: Table,
  props: {
    headerCellStyle: {
      type: [Object, Function],
      default: function() {
        return { color: '#333', 'background-color': '#eeeeee' }
      }
    },
    fit: {
      type: Boolean,
      default: true
    },
    stripe: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: true
    },
    highlightCurrentRow: {
      type: Boolean,
      default: true
    },
    maxHeight: {
      type: [Number, String],
      default: 776
    },
    size: {
      type: String,
      default: 'mini'
    }
  }
}
</script>
