import Vue from 'vue'
import { createPinia, getActivePinia, PiniaVuePlugin } from 'pinia'

Vue.use(PiniaVuePlugin)

export const pinia = createPinia()

export function clearAllStates() {
  getActivePinia()._s.forEach(store => store.$reset())
}
