<script>
import { Button } from 'element-ui'
export default {
  name: 'HtButton',
  extends: Button,
  props: {
    size: {
      type: String,
      default: 'mini'
    }
  }
}
</script>
