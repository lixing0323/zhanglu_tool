import defaultSettings from '@/settings'
import i18n from '@/lang'
import { isValidChinese } from '@/utils/regular'

const title = defaultSettings.title

export default function getPageTitle(pageTitle) {
  if (pageTitle && !isValidChinese(pageTitle)) {
    const pageName = i18n.t(`route.${pageTitle}`)
    return `${pageName} - ${title}`
  }
  return `${title}`
}
