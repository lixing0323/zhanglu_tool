// translate router.meta.title, be used in breadcrumb sidebar tagsview
import { isValidChinese } from '@/utils/regular'

export function generateTitle(title) {
  if (!isValidChinese(title)) {
    const hasKey = this.$te('route.' + title)

    if (hasKey) {
      // $t :this method from vue-i18n, inject in @/lang/index.js
      return this.$t('route.' + title)
    }
  }
  return title
}
