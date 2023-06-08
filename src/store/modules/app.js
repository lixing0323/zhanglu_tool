import Cookies from 'js-cookie'
import { getLanguage } from '@/lang'
import { defineStore } from 'pinia'
import { pinia } from '@/store'

const _useAppStore = defineStore('app', {
  state: () => {
    return {
      sidebar: {
        opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
        withoutAnimation: false
      },
      device: 'desktop',
      language: getLanguage(),
      size: Cookies.get('size') || 'medium'
    }
  },
  actions: {
    toggleSideBar() {
      this.sidebar.opened = !this.sidebar.opened
      this.sidebar.withoutAnimation = false
      if (this.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
    },
    closeSideBar({ withoutAnimation }) {
      Cookies.set('sidebarStatus', 0)
      this.sidebar.opened = false
      this.sidebar.withoutAnimation = withoutAnimation
    },
    toggleDevice(device) {
      this.device = device
    },
    setLanguage(language) {
      this.language = language
      Cookies.set('language', language)
    },
    setSize(size) {
      this.size = size
      Cookies.set('size', size)
    }
  }
})

export function useAppStore() {
  return _useAppStore(pinia)
}
