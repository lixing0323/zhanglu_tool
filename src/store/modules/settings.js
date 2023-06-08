import variables from '@/styles/element-variables.scss'
import defaultSettings from '@/settings'
import { defineStore } from 'pinia'
import { pinia } from '@/store'

const { showSettings, fixedHeader, sidebarLogo } = defaultSettings

const _useSettingsStore = defineStore('settings',
  {
    state: () => {
      return {
        theme: variables.theme,
        showSettings: showSettings,
        fixedHeader: fixedHeader,
        sidebarLogo: sidebarLogo
      }
    },
    actions: {
      changeSetting(data) {
        const { key, value } = data
        // eslint-disable-next-line no-prototype-builtins
        if (this.hasOwnProperty(key)) {
          this[key] = value
        }
      }
    }
  }
)

export function useSettingsStore() {
  return _useSettingsStore(pinia)
}
